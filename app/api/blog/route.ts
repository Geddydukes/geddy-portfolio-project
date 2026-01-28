import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'Geddydukes/geddy-portfolio-project';
const BLOG_PASSWORD = process.env.BLOG_PASSWORD;

interface GitHubContent {
    sha: string;
    content: string;
}

async function getFileFromGitHub(): Promise<GitHubContent | null> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog.ts`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
            }
        );

        if (!response.ok) {
            console.error('GitHub API error:', response.status);
            return null;
        }

        const data = await response.json();
        return {
            sha: data.sha,
            content: Buffer.from(data.content, 'base64').toString('utf-8'),
        };
    } catch (error) {
        console.error('Error fetching from GitHub:', error);
        return null;
    }
}

async function commitToGitHub(content: string, sha: string, message: string): Promise<boolean> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog.ts`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    content: Buffer.from(content).toString('base64'),
                    sha,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('GitHub commit error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error committing to GitHub:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, title, excerpt, content, tags, featured, coverImage, password } = body;

        // Check password
        if (!BLOG_PASSWORD || password !== BLOG_PASSWORD) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        // Validate required fields
        if (!slug || !title || !excerpt || !content || !tags) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if GitHub token is configured
        if (!GITHUB_TOKEN) {
            return NextResponse.json(
                { error: 'GitHub token not configured. Check environment variables.' },
                { status: 500 }
            );
        }

        // Get current blog.ts content from GitHub
        const fileData = await getFileFromGitHub();
        if (!fileData) {
            return NextResponse.json(
                { error: 'Failed to fetch blog.ts from GitHub' },
                { status: 500 }
            );
        }

        // Calculate reading time
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        const readingTime = `${minutes} min read`;

        // Get today's date
        const date = new Date().toISOString().split('T')[0];

        // Escape the content for template literal
        const escapedContent = content
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\${/g, '\\${');

        // Create the new blog post entry
        const newPost = `    {
        slug: "${slug}",
        title: "${title.replace(/"/g, '\\"')}",
        excerpt: "${excerpt.replace(/"/g, '\\"')}",
        content: \`
${escapedContent}
        \`,
        publishedAt: "${date}",
        tags: [${tags.map((t: string) => `"${t}"`).join(', ')}],
        readingTime: "${readingTime}",
        featured: ${featured || false},${coverImage ? `\n        coverImage: "${coverImage}",` : ''}
    },`;

        // Find the blogPosts array and insert the new post at the beginning
        let blogFileContent = fileData.content;

        // More robust pattern to find the array - handles different formatting
        const arrayStartPattern = /export\s+const\s+blogPosts\s*:\s*BlogPost\s*\[\s*\]\s*=\s*\[/;
        const match = blogFileContent.match(arrayStartPattern);

        if (!match || match.index === undefined) {
            return NextResponse.json(
                { error: 'Could not find blogPosts array in blog.ts' },
                { status: 500 }
            );
        }

        // Find the opening bracket position
        const matchEndPosition = match.index + match[0].length;

        // Check if the array is empty or has existing content
        const afterMatch = blogFileContent.slice(matchEndPosition).trimStart();

        if (afterMatch.startsWith(']')) {
            // Empty array - just insert the post
            const closingBracketPos = blogFileContent.indexOf(']', matchEndPosition);
            blogFileContent =
                blogFileContent.slice(0, matchEndPosition) +
                '\n' + newPost + '\n' +
                blogFileContent.slice(closingBracketPos);
        } else {
            // Array has existing posts - insert at beginning
            blogFileContent =
                blogFileContent.slice(0, matchEndPosition) +
                '\n' + newPost +
                blogFileContent.slice(matchEndPosition);
        }

        // Commit to GitHub
        const commitMessage = `Add blog post: ${title}`;
        const success = await commitToGitHub(blogFileContent, fileData.sha, commitMessage);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to commit to GitHub' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog post published successfully! It will be live in about 30 seconds after Vercel rebuilds.',
            slug: slug
        });

    } catch (error) {
        console.error('Error adding blog post:', error);
        return NextResponse.json(
            { error: 'Failed to add blog post' },
            { status: 500 }
        );
    }
}

// GET all blog posts
export async function GET() {
    try {
        const { blogPosts } = await import('@/content/blog');
        return NextResponse.json({ posts: blogPosts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}
