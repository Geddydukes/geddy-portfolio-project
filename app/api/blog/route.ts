import { NextRequest, NextResponse } from "next/server";

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "Geddydukes/geddy-portfolio-project";
const BLOG_FILE_PATH = "content/blog.ts";

interface BlogPostData {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    featured: boolean;
    coverImage?: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: BlogPostData = await request.json();
        const { slug, title, excerpt, content, tags, featured, coverImage, password } = body;

        // Validate password
        if (password !== process.env.BLOG_ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Validate required fields
        if (!slug || !title || !excerpt || !content) {
            return NextResponse.json(
                { error: "Missing required fields: slug, title, excerpt, and content are required" },
                { status: 400 }
            );
        }

        // Calculate reading time
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        const readingTime = `${minutes} min read`;

        // Get today's date
        const publishedAt = new Date().toISOString().split("T")[0];

        // Generate the new blog post entry
        const escapedContent = content
            .replace(/\\/g, "\\\\")
            .replace(/`/g, "\\`")
            .replace(/\${/g, "\\${");

        const newPostEntry = `    {
        slug: "${slug}",
        title: "${title.replace(/"/g, '\\"')}",
        excerpt: "${excerpt.replace(/"/g, '\\"')}",
        content: \`
${escapedContent}
        \`,
        publishedAt: "${publishedAt}",
        tags: [${tags.map((t) => `"${t}"`).join(", ")}],
        readingTime: "${readingTime}",
        featured: ${featured},${coverImage ? `\n        coverImage: "${coverImage}",` : ""}
    },`;

        // Fetch the current blog.ts file from GitHub
        const fileResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_FILE_PATH}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );

        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch blog.ts: ${fileResponse.status}`);
        }

        const fileData = await fileResponse.json();
        const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
        const currentSha = fileData.sha;

        // Find the position to insert the new post (after "export const blogPosts: BlogPost[] = [")
        const insertMarker = "export const blogPosts: BlogPost[] = [";
        const insertIndex = currentContent.indexOf(insertMarker);

        if (insertIndex === -1) {
            throw new Error("Could not find blogPosts array in blog.ts");
        }

        // Insert the new post at the beginning of the array
        const insertPosition = insertIndex + insertMarker.length;
        const newContent =
            currentContent.slice(0, insertPosition) +
            "\n" +
            newPostEntry +
            currentContent.slice(insertPosition);

        // Update the file on GitHub
        const updateResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_FILE_PATH}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Add blog post: ${title}`,
                    content: Buffer.from(newContent).toString("base64"),
                    sha: currentSha,
                }),
            }
        );

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(`Failed to update blog.ts: ${JSON.stringify(errorData)}`);
        }

        return NextResponse.json({
            success: true,
            message: "Blog post published successfully! The site will rebuild shortly.",
            slug,
        });
    } catch (error) {
        console.error("Blog post error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to publish blog post" },
            { status: 500 }
        );
    }
}
