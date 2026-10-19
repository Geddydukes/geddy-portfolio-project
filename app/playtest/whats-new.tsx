import ReactMarkdown from "react-markdown"
import { getGameReleases } from "@/lib/github-releases"
import styles from "./page.module.css"

export default async function WhatsNew() {
    const releases = await getGameReleases()

    if (releases.length === 0) {
        return (
            <section className={styles.whatsNew}>
                <h2 className={styles.sectionHeading}>What&apos;s new</h2>
                <p className={styles.noteBody}>No release notes published yet.</p>
            </section>
        )
    }

    return (
        <section className={styles.whatsNew}>
            <h2 className={styles.sectionHeading}>What&apos;s new</h2>
            {releases.map((release, index) => (
                <details key={release.tag} className={styles.release} open={index === 0}>
                    <summary className={styles.releaseSummary}>
                        <span className={styles.releaseName}>{release.name}</span>
                        {index === 0 && <span className={styles.noteTag}>Latest</span>}
                        {release.prerelease && <span className={styles.noteTag}>Pre-release</span>}
                        {release.publishedAt && (
                            <span className={styles.releaseDate}>
                                {new Date(release.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        )}
                    </summary>
                    <div className={styles.markdown}>
                        <ReactMarkdown>{release.body || "No notes for this release."}</ReactMarkdown>
                    </div>
                </details>
            ))}
        </section>
    )
}
