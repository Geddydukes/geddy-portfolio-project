import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, page } = body;

        // Get visitor info from headers
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";
        const referer = request.headers.get("referer") || "direct";

        // Create a visitor ID based on IP and user agent (anonymous but unique)
        const visitorId = Buffer.from(`${ip}:${userAgent}`).toString("base64").slice(0, 16);

        // Determine the page identifier
        const pageId = slug ? `blog:${slug}` : page ? `page:${page}` : "unknown";

        // Current timestamp and date
        const now = new Date();
        const dateKey = now.toISOString().split("T")[0]; // YYYY-MM-DD

        // Track the view
        await redis.incr(`pageviews:${pageId}:total`);
        await redis.incr(`pageviews:${pageId}:${dateKey}`);
        await redis.sadd(`visitors:${pageId}`, visitorId);
        await redis.sadd(`visitors:${dateKey}`, visitorId);

        // Track referrer
        const refererDomain = referer !== "direct" ? new URL(referer).hostname : "direct";
        await redis.zincrby("referrers", 1, refererDomain);

        // Add to recent visits list (keep last 100)
        const visitData = JSON.stringify({
            timestamp: now.toISOString(),
            pageId,
            visitorId,
            referer: refererDomain,
            isNewVisitor: !(await redis.sismember("all_visitors", visitorId)),
        });
        await redis.lpush("recent_visits", visitData);
        await redis.ltrim("recent_visits", 0, 99);
        await redis.sadd("all_visitors", visitorId);

        // Track page in the set of all pages
        await redis.sadd("all_pages", pageId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics tracking error:", error);
        // Return success anyway to not block the user experience
        return NextResponse.json({ success: true });
    }
}
