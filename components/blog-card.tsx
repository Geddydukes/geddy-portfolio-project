"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/content/blog";
import styles from "./blog-card.module.css";

interface BlogCardProps {
    post: BlogPost;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <div className={styles.cardWrapper}>
            <Link href={`/blog/${post.slug}`} className={styles.card}>
                {post.coverImage ? (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className={styles.coverImage}
                    />
                ) : (
                    <div className={styles.coverPlaceholder}>
                        📝
                    </div>
                )}

                <div className={styles.content}>
                    <div className={styles.meta}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Calendar size={12} />
                            {formatDate(post.publishedAt)}
                        </span>
                        <span className={styles.metaSeparator}>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Clock size={12} />
                            {post.readingTime}
                        </span>
                    </div>

                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.tagsContainer}>
                        {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className={styles.readMore}>
                        Read More
                        <ArrowRight size={14} />
                    </div>
                </div>
            </Link>

            {post.featured && (
                <div className={styles.featuredBadge}>Featured</div>
            )}
        </div>
    );
}
