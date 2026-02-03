import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Check authorization
        const authHeader = request.headers.get("authorization");
        const password = process.env.ANALYTICS_PASSWORD || process.env.BLOG_PASSWORD;

        if (!authHeader || authHeader !== `Bearer ${password}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if Redis is configured
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            return NextResponse.json({ error: "Upstash Redis not configured" }, { status: 500 });
        }

        // Lazy import Redis
        const { Redis } = await import("@upstash/redis");
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });

        // Get all page views
        const views = await redis.hgetall("analytics:views") || {};

        // Get unique visitor counts for each page
        const uniqueCounts: Record<string, number> = {};
        for (const pageId of Object.keys(views)) {
            const count = await redis.scard(`analytics:unique:${pageId}`);
            uniqueCounts[pageId] = count || 0;
        }

        // Get today's stats
        const today = new Date().toISOString().split("T")[0];
        const todayViews = await redis.hgetall(`analytics:daily:${today}`) || {};

        // Get last 7 days of data
        const last7Days: Record<string, Record<string, number>> = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const dayViews = await redis.hgetall(`analytics:daily:${dateStr}`);
            if (dayViews && Object.keys(dayViews).length > 0) {
                last7Days[dateStr] = dayViews as Record<string, number>;
            }
        }

        // Get referrer breakdown
        const referrers = await redis.hgetall("analytics:referrers") || {};

        // Get recent visit log (last 50)
        const recentVisits = await redis.lrange("analytics:visit-log", 0, 49);
        const parsedVisits = recentVisits.map((visit: string | object) => {
            try {
                return typeof visit === 'string' ? JSON.parse(visit) : visit;
            } catch {
                return visit;
            }
        });

        // Calculate totals
        const totalViews = Object.values(views).reduce((sum: number, v) => sum + Number(v), 0);
        const totalUnique = Object.values(uniqueCounts).reduce((sum, v) => sum + v, 0);
        const todayTotal = Object.values(todayViews).reduce((sum: number, v) => sum + Number(v), 0);

        return NextResponse.json({
            summary: {
                totalViews,
                totalUniqueVisitors: totalUnique,
                todayViews: todayTotal,
            },
            pageBreakdown: Object.keys(views).map(pageId => ({
                page: pageId,
                views: Number(views[pageId]),
                uniqueVisitors: uniqueCounts[pageId] || 0,
            })).sort((a, b) => b.views - a.views),
            referrers: Object.entries(referrers)
                .map(([source, count]) => ({ source, count: Number(count) }))
                .sort((a, b) => b.count - a.count),
            last7Days,
            recentVisits: parsedVisits,
            generatedAt: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Analytics stats error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
