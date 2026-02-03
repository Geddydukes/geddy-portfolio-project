import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(request: NextRequest) {
    try {
        // Check authorization
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (token !== process.env.ANALYTICS_PASSWORD) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get today's date
        const today = new Date().toISOString().split("T")[0];

        // Get all tracked pages
        const allPages = await redis.smembers("all_pages");

        // Calculate totals
        let totalViews = 0;
        const pageBreakdown: Array<{ page: string; views: number; uniqueVisitors: number }> = [];

        for (const pageId of allPages) {
            const views = (await redis.get(`pageviews:${pageId}:total`)) as number || 0;
            const uniqueVisitors = await redis.scard(`visitors:${pageId}`);
            totalViews += views;
            pageBreakdown.push({
                page: pageId as string,
                views,
                uniqueVisitors,
            });
        }

        // Sort by views descending
        pageBreakdown.sort((a, b) => b.views - a.views);

        // Get total unique visitors
        const totalUniqueVisitors = await redis.scard("all_visitors");

        // Get today's views (sum across all pages)
        let todayViews = 0;
        for (const pageId of allPages) {
            const dayViews = (await redis.get(`pageviews:${pageId}:${today}`)) as number || 0;
            todayViews += dayViews;
        }

        // Get referrers
        const referrersRaw = await redis.zrange("referrers", 0, -1, { withScores: true });
        const referrers: Array<{ source: string; count: number }> = [];
        for (let i = 0; i < referrersRaw.length; i += 2) {
            referrers.push({
                source: referrersRaw[i] as string,
                count: referrersRaw[i + 1] as number,
            });
        }
        referrers.sort((a, b) => b.count - a.count);

        // Get last 7 days stats
        const last7Days: Record<string, Record<string, number>> = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split("T")[0];
            last7Days[dateKey] = {};

            for (const pageId of allPages) {
                const views = (await redis.get(`pageviews:${pageId}:${dateKey}`)) as number || 0;
                if (views > 0) {
                    last7Days[dateKey][pageId as string] = views;
                }
            }
        }

        // Get recent visits
        const recentVisitsRaw = await redis.lrange("recent_visits", 0, 19);
        const recentVisits = recentVisitsRaw.map((visit) => {
            try {
                return typeof visit === "string" ? JSON.parse(visit) : visit;
            } catch {
                return null;
            }
        }).filter(Boolean);

        return NextResponse.json({
            summary: {
                totalViews,
                totalUniqueVisitors,
                todayViews,
            },
            pageBreakdown,
            referrers,
            last7Days,
            recentVisits,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Analytics stats error:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
}
