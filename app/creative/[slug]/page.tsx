import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CreativeProjectCard from "@/components/creative-project-card"
import AnalyticsTracker from "@/components/analytics-tracker"
import { creativeProjects } from "@/content/creative"
import styles from "../page.module.css"

type Params = { params: { slug: string } }

export function generateStaticParams() {
    return creativeProjects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
    const project = creativeProjects.find((p) => p.slug === params.slug)
    if (!project) return {}
    return {
        title: `${project.name} | Geddy Dukes`,
        description: project.impactStatement,
    }
}

export default function CreativeProjectPage({ params }: Params) {
    const project = creativeProjects.find((p) => p.slug === params.slug)
    if (!project) notFound()

    return (
        <div className={styles.pageWrapper}>
            <AnalyticsTracker page={`creative-${project.slug}`} />
            <section className="container">
                <div className={styles.grid}>
                    <Link href="/creative" className={styles.back}>← Creative Engineering</Link>
                    <CreativeProjectCard {...project} />
                </div>
            </section>
        </div>
    )
}
