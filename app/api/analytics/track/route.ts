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

const OWN_HOSTS = /(^|\.)geddydukes\.com$|\.vercel\.app$|^localhost$/;

const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|phantom|python-requests|curl\/|wget|scrapy|httpclient|okhttp|go-http|preview|facebookexternalhit|embedly|monitor|uptime/i;

function classifyDevice(userAgent: string): "bot" | "mobile" | "desktop" {
    if (userAgent === "unknown" || BOT_UA.test(userAgent)) return "bot";
    return /mobile|android|iphone|ipad/i.test(userAgent) ? "mobile" : "desktop";
}

function hostname(url: string): string | null {
    try {
        return new URL(url).hostname.toLowerCase();
    } catch {
        return null;
    }
}

const SOURCE_LABELS: Array<[RegExp, string]> = [
    [/google\./, "Google"],
    [/(^|\.)(twitter\.com|x\.com|t\.co)$/, "Twitter/X"],
    [/linkedin\.com|lnkd\.in/, "LinkedIn"],
    [/github\.com/, "GitHub"],
    [/news\.ycombinator\.com/, "Hacker News"],
    [/reddit\.com/, "Reddit"],
];

// pageUrl is the Referer header (our own page, including any UTM params);
// externalReferrer is document.referrer from the client.
function deriveSource(pageUrl: string, externalReferrer: string): string {
    try {
        const utm = new URL(pageUrl).searchParams.get("utm_source");
        if (utm) return /tldr/i.test(utm) ? "TLDR" : utm;
    } catch {
        // pageUrl missing or malformed; fall through to the referrer
    }
    if (/tldr/i.test(pageUrl)) return "TLDR";

    const host = externalReferrer ? hostname(externalReferrer) : null;
    if (!host) return "direct";
    if (OWN_HOSTS.test(host)) return "internal";
    return SOURCE_LABELS.find(([re]) => re.test(host))?.[1] ?? host;
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
        const { slug, page, referrer } = body;

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
        const pageUrl = request.headers.get("referer") || "";
        const source = deriveSource(pageUrl, typeof referrer === "string" ? referrer : "");
        const device = classifyDevice(userAgent);
        const country = request.headers.get("x-vercel-ip-country") || "unknown";

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
            referer: source,
            device,
            country,
            isNewVisitor: isNewVisitor === 1,
        };

        // Store last 1000 visits in a list
        await redis.lpush("analytics:visit-log", JSON.stringify(visitLog));
        await redis.ltrim("analytics:visit-log", 0, 999);

        // Sources live under a new key: the old analytics:referrers hash holds
        // mostly our own page URLs and is left untouched.
        await redis.hincrby("analytics:sources", source, 1);
        await redis.hincrby("analytics:devices", device, 1);
        await redis.hincrby("analytics:countries", country, 1);

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
