import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/content/blog";
import BlogPostContent from "./blog-post-content";
import styles from "./page.module.css";

// Generate static params for all blog posts
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

interface PageProps {
    params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
    const post = getBlogPost(params.slug);

    if (!post) {
        return (
            <div className={styles.pageWrapper}>
                <div className="container">
                    <div className={styles.notFound}>
                        <h1 className={styles.notFoundTitle}>Post Not Found</h1>
                        <p className={styles.notFoundText}>
                            The blog post you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link href="/blog" className={styles.notFoundLink}>
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return <BlogPostContent post={post} />;
}
