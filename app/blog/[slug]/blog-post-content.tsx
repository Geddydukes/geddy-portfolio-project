"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from "lucide-react";
import { BlogPost } from "@/content/blog";
import AnalyticsTracker from "@/components/analytics-tracker";
import styles from "./page.module.css";

// Helper function to generate slug from header text for anchor links
function generateHeaderId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Simple markdown parser for basic formatting
function parseMarkdown(content: string): string {
    let html = content;

    // First, handle reference-style images (Google Docs format)
    const refImageRegex = /\[([^\]]+)\]:\s*<([^>]+)>/g;
    const imageRefs: { [key: string]: string } = {};
    let match;
    while ((match = refImageRegex.exec(content)) !== null) {
        imageRefs[match[1]] = match[2];
    }

    // Replace reference-style image uses with actual images
    html = html.replace(/!\[([^\]]*)\]\[([^\]]+)\]/g, (_, alt, ref) => {
        const src = imageRefs[ref];
        if (src) {
            return `<img src="${src}" alt="${alt || ref}" />`;
        }
        return `[Image: ${ref}]`;
    });

    // Remove the reference definitions from the output
    html = html.replace(/\[([^\]]+)\]:\s*<[^>]+>/g, '');

    // Headers with IDs for anchor links (table of contents support)
    html = html.replace(/^### (.*$)/gim, (_, headerText) => {
        const id = generateHeaderId(headerText);
        return `<h3 id="${id}">${headerText}</h3>`;
    });
    html = html.replace(/^## (.*$)/gim, (_, headerText) => {
        const id = generateHeaderId(headerText);
        return `<h2 id="${id}">${headerText}</h2>`;
    });
    html = html.replace(/^# (.*$)/gim, (_, headerText) => {
        const id = generateHeaderId(headerText);
        return `<h1 id="${id}">${headerText}</h1>`;
    });

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Code blocks - escape HTML entities inside code
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<pre><code>${escaped}</code></pre>`;
    });
    html = html.replace(/`([^`]+)`/g, (_, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<code>${escaped}</code>`;
    });

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Inline images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Paragraphs
    const lines = html.split('\n');
    html = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed &&
            !trimmed.startsWith('<h') &&
            !trimmed.startsWith('<ul') &&
            !trimmed.startsWith('<li') &&
            !trimmed.startsWith('<pre') &&
            !trimmed.startsWith('<blockquote') &&
            !trimmed.startsWith('<hr') &&
            !trimmed.startsWith('<img')) {
            return `<p>${trimmed}</p>`;
        }
        return line;
    }).join('\n');

    html = html.replace(/<p><\/p>/g, '');

    return html;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <AnalyticsTracker slug={post.slug} />
            <section className={styles.heroSection}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/blog" className={styles.backLink}>
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.meta}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                        </span>
                        <span className={styles.metaSeparator}>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={14} />
                            {post.readingTime}
                        </span>
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        className={styles.tagsContainer}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {post.tags.map(tag => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {post.coverImage && (
                        <motion.img
                            src={post.coverImage}
                            alt={post.title}
                            className={styles.coverImage}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        />
                    )}
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className="container">
                    <motion.article
                        className={styles.content}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                    />

                    <motion.div
                        className={styles.shareSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <p className={styles.shareTitle}>Share this article</p>
                        <div className={styles.shareButtons}>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareButton}
                            >
                                <Twitter size={16} />
                                Twitter
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareButton}
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </a>
                            <button
                                className={styles.shareButton}
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    alert('Link copied to clipboard!');
                                }}
                            >
                                <Share2 size={16} />
                                Copy Link
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
