import type { Metadata } from "next"
import CreativeListCard from "@/components/creative-list-card"
import AnalyticsTracker from "@/components/analytics-tracker"
import { creativeIntro, creativeProjects } from "@/content/creative"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "Creative Engineering | Geddy Dukes",
    description: creativeIntro.body,
}

export default function CreativePage() {
    return (
        <div className={styles.pageWrapper}>
            <AnalyticsTracker page="creative" />
            <section className="container">
                <h1 className={styles.title}>{creativeIntro.heading}</h1>
                <p className={styles.subtitle}>{creativeIntro.body}</p>
                <div className={styles.grid}>
                    {creativeProjects.map((project) => (
                        <CreativeListCard key={project.slug} {...project} />
                    ))}
                </div>
            </section>
        </div>
    )
}
