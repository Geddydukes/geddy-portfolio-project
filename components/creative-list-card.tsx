"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { CreativeProject } from "@/content/creative"
import styles from "./featured-project-card.module.css"

export default function CreativeListCard({ slug, name, label, kind, impactStatement, image }: CreativeProject) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Link href={`/creative/${slug}`} className={styles.card} style={{ display: "flex" }}>
                {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.src} alt={image.alt} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginBottom: "1.5rem" }} />
                )}
                <span className={styles.label} style={{ alignSelf: "flex-start" }}>{label}</span>
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.techStack}>{kind}</p>
                <p className={styles.impactStatement} style={{ margin: "0.75rem 0 1rem" }}>{impactStatement}</p>
                <span className={styles.linkButton} style={{ alignSelf: "flex-start" }}>Read more →</span>
            </Link>
        </motion.div>
    )
}
