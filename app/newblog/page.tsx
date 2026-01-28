"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, Code, Copy, Check, Image as ImageIcon, Sparkles, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

// Simple markdown parser for preview
function parseMarkdown(content: string): string {
    let html = content;

    // First, handle reference-style images (Google Docs format)
    // Find all image reference definitions like [image1]: <data:image/png;base64,...>
    const refImageRegex = /\[([^\]]+)\]:\s*<([^>]+)>/g;
    const imageRefs: { [key: string]: string } = {};
    let match;
    while ((match = refImageRegex.exec(content)) !== null) {
        imageRefs[match[1]] = match[2];
    }

    // Replace reference-style image uses with actual images: ![][image1] -> <img src="..." />
    html = html.replace(/!\[([^\]]*)\]\[([^\]]+)\]/g, (_, alt, ref) => {
        const src = imageRefs[ref];
        if (src) {
            return `<img src="${src}" alt="${alt || ref}" style="max-width: 100%; border-radius: 8px; margin: 1rem 0;" />`;
        }
        return `[Image: ${ref}]`;
    });

    // Remove the reference definitions from the output
    html = html.replace(/\[([^\]]+)\]:\s*<[^>]+>/g, '');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

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

    // Inline images (including base64)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 8px; margin: 1rem 0;" />');

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

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

export default function NewBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [featured, setFeatured] = useState(false);
    const [activeTab, setActiveTab] = useState<"edit" | "preview" | "code">("edit");
    const [copied, setCopied] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [postStatus, setPostStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");
    const [password, setPassword] = useState("");
    const contentRef = useRef<HTMLTextAreaElement>(null);

    // Handle title change and auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    // Handle posting the blog
    const handlePost = async () => {
        // Validate required fields
        if (!password.trim()) {
            setPostStatus("error");
            setStatusMessage("Please enter the admin password");
            return;
        }
        if (!title.trim()) {
            setPostStatus("error");
            setStatusMessage("Please enter a title");
            return;
        }
        if (!excerpt.trim()) {
            setPostStatus("error");
            setStatusMessage("Please enter an excerpt");
            return;
        }
        if (!content.trim()) {
            setPostStatus("error");
            setStatusMessage("Please enter content");
            return;
        }

        setIsPosting(true);
        setPostStatus("idle");

        try {
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    slug: slug || generateSlug(title),
                    title,
                    excerpt,
                    content,
                    tags: tagsArray.length > 0 ? tagsArray : ["Uncategorized"],
                    featured,
                    coverImage: coverImage || undefined,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPostStatus("success");
                setStatusMessage(data.message || "Blog post published! Vercel is rebuilding...");

                // Redirect to blog list after a delay (since post won't be immediately available)
                setTimeout(() => {
                    router.push('/blog');
                }, 3000);
            } else {
                setPostStatus("error");
                setStatusMessage(data.error || "Failed to publish blog post");
            }
        } catch (error) {
            setPostStatus("error");
            setStatusMessage("Failed to connect to server");
        } finally {
            setIsPosting(false);
        }
    };

    // Handle image paste in content area
    const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith('image/')) {
                e.preventDefault();
                const file = item.getAsFile();
                if (!file) continue;

                // Convert to base64
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target?.result as string;
                    const textarea = contentRef.current;
                    if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const imageMarkdown = `![Image](${base64})`;
                        const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
                        setContent(newContent);
                    }
                };
                reader.readAsDataURL(file);
                break;
            }
        }
    }, [content]);

    // Handle cover image paste
    const handleCoverPaste = useCallback(async (e: React.ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith('image/')) {
                e.preventDefault();
                const file = item.getAsFile();
                if (!file) continue;

                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target?.result as string;
                    setCoverImage(base64);
                };
                reader.readAsDataURL(file);
                break;
            }
        }
    }, []);

    // Generate the TypeScript code for blog.ts
    const generateCode = () => {
        const date = new Date().toISOString().split('T')[0];
        const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
        const readingTime = calculateReadingTime(content);

        // Escape backticks and ${} in content for template literal
        const escapedContent = content
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\${/g, '\\${');

        return `{
    slug: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    content: \`
${escapedContent}
    \`,
    publishedAt: "${date}",
    tags: [${tagsArray.map(t => `"${t}"`).join(', ')}],
    readingTime: "${readingTime}",
    featured: ${featured},${coverImage ? `\n    coverImage: "${coverImage.substring(0, 50)}...",` : ''}
},`;
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.pageWrapper}>
            <section className={styles.heroSection}>
                <div className="container">
                    <motion.div
                        className={styles.header}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles className={styles.headerIcon} />
                        <h1 className={styles.title}>New Blog Post</h1>
                        <p className={styles.subtitle}>Create and preview your blog post</p>
                    </motion.div>
                </div>
            </section>

            <section className={styles.editorSection}>
                <div className="container">
                    <motion.div
                        className={styles.editorContainer}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {/* Metadata inputs */}
                        <div className={styles.metadataGrid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="My Awesome Blog Post"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Slug</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="my-awesome-blog-post"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup + " " + styles.fullWidth}>
                                <label className={styles.label}>Excerpt</label>
                                <input
                                    type="text"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="A brief description of your post..."
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="AI, Machine Learning, Tutorial"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Cover Image (paste or URL)</label>
                                <input
                                    type="text"
                                    value={coverImage.length > 100 ? "Image pasted ✓" : coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    onPaste={handleCoverPaste}
                                    placeholder="Paste image or enter URL..."
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup + " " + styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={featured}
                                        onChange={(e) => setFeatured(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    Featured Post
                                </label>
                            </div>
                            <div className={styles.inputGroup + " " + styles.fullWidth}>
                                <label className={styles.label}>Admin Password 🔒</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your blog admin password..."
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Tab navigation */}
                        <div className={styles.tabContainer}>
                            <button
                                className={`${styles.tab} ${activeTab === "edit" ? styles.tabActive : ""}`}
                                onClick={() => setActiveTab("edit")}
                            >
                                <ImageIcon size={16} />
                                Edit
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === "preview" ? styles.tabActive : ""}`}
                                onClick={() => setActiveTab("preview")}
                            >
                                <Eye size={16} />
                                Preview
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === "code" ? styles.tabActive : ""}`}
                                onClick={() => setActiveTab("code")}
                            >
                                <Code size={16} />
                                Code
                            </button>
                        </div>

                        {/* Content area */}
                        <div className={styles.contentArea}>
                            {activeTab === "edit" && (
                                <div className={styles.editPanel}>
                                    <textarea
                                        ref={contentRef}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        onPaste={handlePaste}
                                        placeholder="Write your blog post in Markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

> Blockquote

\`inline code\`

```javascript
// Code block
const hello = 'world';
```

Paste images directly into this editor!"
                                        className={styles.textarea}
                                    />
                                    <p className={styles.hint}>
                                        <ImageIcon size={14} />
                                        Tip: Paste images directly from clipboard (Cmd+V)
                                    </p>
                                </div>
                            )}

                            {activeTab === "preview" && (
                                <div className={styles.previewPanel}>
                                    {coverImage && (
                                        <img
                                            src={coverImage}
                                            alt="Cover"
                                            className={styles.coverPreview}
                                        />
                                    )}
                                    <h1 className={styles.previewTitle}>{title || "Untitled Post"}</h1>
                                    <p className={styles.previewMeta}>
                                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        {" • "}
                                        {calculateReadingTime(content)}
                                    </p>
                                    <div className={styles.previewTags}>
                                        {tags.split(',').filter(Boolean).map(tag => (
                                            <span key={tag.trim()} className={styles.previewTag}>
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                    <div
                                        className={styles.previewContent}
                                        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
                                    />
                                </div>
                            )}

                            {activeTab === "code" && (
                                <div className={styles.codePanel}>
                                    <div className={styles.codeHeader}>
                                        <span>Add this to <code>content/blog.ts</code></span>
                                        <button
                                            onClick={handleCopyCode}
                                            className={styles.copyButton}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                            {copied ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <pre className={styles.codeBlock}>
                                        <code>{generateCode()}</code>
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Post button and status */}
                        <div className={styles.postSection}>
                            {postStatus !== "idle" && (
                                <div className={`${styles.statusMessage} ${styles[postStatus]}`}>
                                    {postStatus === "success" ? (
                                        <CheckCircle size={18} />
                                    ) : (
                                        <AlertCircle size={18} />
                                    )}
                                    {statusMessage}
                                </div>
                            )}
                            <button
                                onClick={handlePost}
                                disabled={isPosting}
                                className={styles.postButton}
                            >
                                {isPosting ? (
                                    <>
                                        <Loader2 size={18} className={styles.spinner} />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Publish Post
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
