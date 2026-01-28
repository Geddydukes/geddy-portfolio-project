export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
    readingTime: string;
    featured?: boolean;
    coverImage?: string;
};

export const blogPosts: BlogPost[] = [
    // Your blog posts will go here
    // Example structure:
    // {
    //   slug: "my-first-post",
    //   title: "My First Blog Post",
    //   excerpt: "A brief description of what this post is about...",
    //   content: `
    //     # My First Blog Post
    //     
    //     Your markdown content here...
    //   `,
    //   publishedAt: "2026-01-27",
    //   tags: ["AI", "Machine Learning"],
    //   readingTime: "5 min read",
    //   featured: true,
    // },
];

// Helper function to get a post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
    return blogPosts.filter(post => post.featured);
}

// Helper function to get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
    return blogPosts.filter(post => post.tags.includes(tag));
}

// Helper function to get all unique tags
export function getAllTags(): string[] {
    const tags = blogPosts.flatMap(post => post.tags);
    return [...new Set(tags)];
}
