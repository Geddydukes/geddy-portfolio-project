import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Generate a simple hash from IP + User Agent for visitor fingerprinting
function generateVisitorId(ip: string, userAgent: string): string {
    const str = `${ip}-${userAgent}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
    try {
        // Check if Redis is configured
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            console.warn("Analytics: Upstash Redis not configured");
            return NextResponse.json({ success: false, reason: "not_configured" }, { status: 200 });
        }

        // Lazy import Redis
        const { Redis } = await import("@upstash/redis");
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });

        const body = await request.json();
        const { slug, page } = body;

        if (!slug && !page) {
            return NextResponse.json({ error: "Missing slug or page" }, { status: 400 });
        }

        const pageId = slug ? `blog:${slug}` : `page:${page}`;
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";
        const visitorId = generateVisitorId(ip, userAgent);
        const today = new Date().toISOString().split("T")[0];
        const referer = request.headers.get("referer") || "direct";

        // Track total views
        await redis.hincrby("analytics:views", pageId, 1);

        // Track daily views
        await redis.hincrby(`analytics:daily:${today}`, pageId, 1);

        // Track unique visitors using a set
        const uniqueKey = `analytics:unique:${pageId}`;
        const isNewVisitor = await redis.sadd(uniqueKey, visitorId);

        // Track daily unique visitors
        const dailyUniqueKey = `analytics:daily-unique:${today}:${pageId}`;
        await redis.sadd(dailyUniqueKey, visitorId);

        // Log the visit with timestamp for detailed tracking
        const visitLog = {
            timestamp: new Date().toISOString(),
            pageId,
            visitorId,
            referer: referer.includes("tldr") ? "TLDR" :
                referer.includes("google") ? "Google" :
                    referer.includes("twitter") || referer.includes("x.com") ? "Twitter/X" :
                        referer.includes("linkedin") ? "LinkedIn" :
                            referer.includes("github") ? "GitHub" :
                                referer,
            isNewVisitor: isNewVisitor === 1,
        };

        // Store last 1000 visits in a list
        await redis.lpush("analytics:visit-log", JSON.stringify(visitLog));
        await redis.ltrim("analytics:visit-log", 0, 999);

        // Track referrer sources
        if (referer !== "direct") {
            await redis.hincrby("analytics:referrers", visitLog.referer, 1);
        }

        return NextResponse.json({
            success: true,
            isNewVisitor: isNewVisitor === 1
        });

    } catch (error) {
        console.error("Analytics tracking error:", error);
        // Fail silently - don't break the user experience
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
