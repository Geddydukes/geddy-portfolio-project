"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog-card";
import AnalyticsTracker from "@/components/analytics-tracker";
import { blogPosts, getAllTags } from "@/content/blog";
import styles from "./page.module.css";

export default function BlogPage() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const allTags = getAllTags();

    const filteredPosts = selectedTag
        ? blogPosts.filter(post => post.tags.includes(selectedTag))
        : blogPosts;

    return (
        <div className={styles.pageWrapper}>
            <AnalyticsTracker page="blog" />
            <section className={styles.heroSection}>
                <div className="container">
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Blog
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Thoughts on AI, machine learning, software engineering, and building things that matter.
                    </motion.p>

                    {allTags.length > 0 && (
                        <motion.div
                            className={styles.tagsContainer}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <button
                                className={`${styles.tagButton} ${!selectedTag ? styles.tagButtonActive : ""}`}
                                onClick={() => setSelectedTag(null)}
                            >
                                All
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`${styles.tagButton} ${selectedTag === tag ? styles.tagButtonActive : ""}`}
                                    onClick={() => setSelectedTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            className={styles.postsGrid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateIcon}>📝</div>
                            <p className={styles.emptyStateText}>No blog posts yet</p>
                            <p className={styles.emptyStateSubtext}>Check back soon for new content!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
