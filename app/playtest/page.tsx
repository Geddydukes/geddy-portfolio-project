import type { Metadata } from "next"
import PlaytestNotes from "./playtest-notes"
import { playtestBuild } from "@/content/playtest"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: `${playtestBuild.game} Playtest | Geddy Dukes`,
    description: "Playtest notes for Pokémon Legacy: Concord Edition.",
    robots: { index: false, follow: false },
}

export default function PlaytestPage({
    searchParams,
}: {
    searchParams: { tags?: string }
}) {
    const initialTags = (searchParams.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

    return (
        <div className={styles.pageWrapper}>
            <section className="container">
                <h1 className={styles.title}>{playtestBuild.game}</h1>
                <p className={styles.build}>Playtest build v{playtestBuild.version}</p>
                <p className={styles.subtitle}>{playtestBuild.status}</p>
                <PlaytestNotes initialTags={initialTags} />
            </section>
        </div>
    )
}
