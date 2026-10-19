export type GameRelease = {
    tag: string;
    name: string;
    publishedAt: string | null;
    body: string;
    prerelease: boolean;
};

const REPO = "Geddydukes/Pokemon-Legacy-Concord";

// The game repo is private, so this needs a fine-grained token with read-only
// "Contents" access (releases are covered by it). Set GITHUB_TOKEN on the server only.
export async function getGameReleases(limit = 5): Promise<GameRelease[]> {
    const token = process.env.GITHUB_TOKEN;
    try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=${limit}`, {
            headers: {
                Accept: "application/vnd.github+json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            next: { revalidate: 600 },
        });
        if (!res.ok) return [];
        const data = (await res.json()) as any[];
        return data
            .filter((release) => !release.draft)
            .map((release) => ({
                tag: release.tag_name,
                name: release.name || release.tag_name,
                publishedAt: release.published_at ?? null,
                body: release.body ?? "",
                prerelease: Boolean(release.prerelease),
            }));
    } catch {
        return [];
    }
}
