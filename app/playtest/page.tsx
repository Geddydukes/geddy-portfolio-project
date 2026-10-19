import type { Metadata } from "next"
import PlaytestNotes from "./playtest-notes"
import WhatsNew from "./whats-new"
import { getGameReleases } from "@/lib/github-releases"
import { playtestBuild } from "@/content/playtest"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: `${playtestBuild.game} Playtest | Geddy Dukes`,
    description: "Playtest notes for Pokémon Legacy: Concord Edition.",
    robots: { index: false, follow: false },
}

export default async function PlaytestPage({
    searchParams,
}: {
    searchParams: { tags?: string }
}) {
    const initialTags = (searchParams.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

    const [latest] = await getGameReleases(1)

    return (
        <div className={styles.pageWrapper}>
            <section className="container">
                <h1 className={styles.title}>{playtestBuild.game}</h1>
                <p className={styles.build}>Playtest build {latest ? latest.tag : `v${playtestBuild.version}`}</p>
                <p className={styles.subtitle}>{playtestBuild.status}</p>
                <WhatsNew />
                <PlaytestNotes initialTags={initialTags} />
            </section>
        </div>
    )
}
