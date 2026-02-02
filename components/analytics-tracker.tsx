"use client";

import { useEffect, useRef } from "react";

interface AnalyticsTrackerProps {
    slug?: string;
    page?: string;
}

export default function AnalyticsTracker({ slug, page }: AnalyticsTrackerProps) {
    const tracked = useRef(false);

    useEffect(() => {
        // Only track once per page load
        if (tracked.current) return;
        tracked.current = true;

        const trackView = async () => {
            try {
                await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug, page }),
                });
            } catch (error) {
                // Fail silently - don't impact user experience
                console.debug("Analytics tracking failed:", error);
            }
        };

        // Small delay to ensure the page has loaded
        setTimeout(trackView, 100);
    }, [slug, page]);

    // This component renders nothing
    return null;
}
