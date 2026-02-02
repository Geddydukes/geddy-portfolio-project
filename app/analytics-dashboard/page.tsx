"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, RefreshCw, Lock, Globe } from "lucide-react";
import styles from "./page.module.css";

interface AnalyticsData {
    summary: {
        totalViews: number;
        totalUniqueVisitors: number;
        todayViews: number;
    };
    pageBreakdown: Array<{
        page: string;
        views: number;
        uniqueVisitors: number;
    }>;
    referrers: Array<{
        source: string;
        count: number;
    }>;
    last7Days: Record<string, Record<string, number>>;
    recentVisits: Array<{
        timestamp: string;
        pageId: string;
        visitorId: string;
        referer: string;
        isNewVisitor: boolean;
    }>;
    generatedAt: string;
}

export default function AnalyticsDashboard() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAnalytics = async (pwd: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/analytics/stats", {
                headers: {
                    Authorization: `Bearer ${pwd}`,
                },
            });

            if (response.status === 401) {
                setError("Invalid password");
                setIsAuthenticated(false);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch analytics");
            }

            const analytics = await response.json();
            setData(analytics);
            setIsAuthenticated(true);
        } catch {
            setError("Failed to load analytics. Make sure Upstash Redis is configured.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAnalytics(password);
    };

    const refresh = () => {
        if (password) {
            fetchAnalytics(password);
        }
    };

    const formatPageName = (pageId: string) => {
        if (pageId.startsWith("blog:")) {
            return pageId.replace("blog:", "📝 ");
        }
        if (pageId.startsWith("page:")) {
            return pageId.replace("page:", "📄 ");
        }
        return pageId;
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.loginContainer}>
                    <motion.div
                        className={styles.loginCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Lock size={48} className={styles.lockIcon} />
                        <h1 className={styles.loginTitle}>Analytics Dashboard</h1>
                        <p className={styles.loginSubtitle}>Enter your password to view analytics</p>

                        <form onSubmit={handleLogin} className={styles.loginForm}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={styles.passwordInput}
                                autoFocus
                            />
                            <button type="submit" className={styles.loginButton} disabled={loading}>
                                {loading ? "Loading..." : "View Analytics"}
                            </button>
                        </form>

                        {error && <p className={styles.error}>{error}</p>}
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className={styles.title}>📊 Analytics Dashboard</h1>
                    <button onClick={refresh} className={styles.refreshButton} disabled={loading}>
                        <RefreshCw size={16} className={loading ? styles.spinning : ""} />
                        Refresh
                    </button>
                </motion.div>

                {data && (
                    <>
                        {/* Summary Cards */}
                        <motion.div
                            className={styles.summaryGrid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <Eye size={24} />
                                </div>
                                <div className={styles.summaryContent}>
                                    <p className={styles.summaryLabel}>Total Views</p>
                                    <p className={styles.summaryValue}>{data.summary.totalViews.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <Users size={24} />
                                </div>
                                <div className={styles.summaryContent}>
                                    <p className={styles.summaryLabel}>Unique Visitors</p>
                                    <p className={styles.summaryValue}>{data.summary.totalUniqueVisitors.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <TrendingUp size={24} />
                                </div>
                                <div className={styles.summaryContent}>
                                    <p className={styles.summaryLabel}>Today&apos;s Views</p>
                                    <p className={styles.summaryValue}>{data.summary.todayViews.toLocaleString()}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Page Breakdown */}
                        <motion.div
                            className={styles.section}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className={styles.sectionTitle}>Page Performance</h2>
                            <div className={styles.tableCard}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Page</th>
                                            <th>Views</th>
                                            <th>Unique</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.pageBreakdown.map((page) => (
                                            <tr key={page.page}>
                                                <td>{formatPageName(page.page)}</td>
                                                <td>{page.views.toLocaleString()}</td>
                                                <td>{page.uniqueVisitors.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Referrers */}
                        {data.referrers.length > 0 && (
                            <motion.div
                                className={styles.section}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className={styles.sectionTitle}>Traffic Sources</h2>
                                <div className={styles.referrerGrid}>
                                    {data.referrers.slice(0, 8).map((ref) => (
                                        <div key={ref.source} className={styles.referrerCard}>
                                            <Globe size={16} />
                                            <span className={styles.referrerName}>{ref.source}</span>
                                            <span className={styles.referrerCount}>{ref.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Recent Visits */}
                        <motion.div
                            className={styles.section}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className={styles.sectionTitle}>Recent Activity</h2>
                            <div className={styles.activityList}>
                                {data.recentVisits.slice(0, 20).map((visit, index) => (
                                    <div key={index} className={styles.activityItem}>
                                        <div className={styles.activityDot} data-new={visit.isNewVisitor} />
                                        <div className={styles.activityContent}>
                                            <span className={styles.activityPage}>{formatPageName(visit.pageId)}</span>
                                            <span className={styles.activityMeta}>
                                                {visit.isNewVisitor && <span className={styles.newBadge}>New</span>}
                                                <span>{visit.referer}</span>
                                                <span>•</span>
                                                <span>{formatTime(visit.timestamp)}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <p className={styles.footer}>
                            Last updated: {new Date(data.generatedAt).toLocaleString()}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
