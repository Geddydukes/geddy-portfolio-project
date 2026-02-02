"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Package, BookOpen, FileText } from "lucide-react"
import { Project } from "@/content/portfolio"
import styles from "./featured-project-card.module.css"

export default function FeaturedProjectCard({
    name,
    label,
    impactStatement,
    description,
    capabilities,
    stack,
    links
}: Project) {
    const getLinkIcon = (type: string) => {
        switch (type) {
            case "github":
                return <Github className="h-4 w-4" />
            case "npm":
            case "pypi":
                return <Package className="h-4 w-4" />
            case "demo":
            case "site":
                return <ExternalLink className="h-4 w-4" />
            case "docs":
            case "case-study":
            case "writeup":
                return <BookOpen className="h-4 w-4" />
            case "blog":
                return <FileText className="h-4 w-4" />
            default:
                return <ExternalLink className="h-4 w-4" />
        }
    }

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.impactStatement}>{impactStatement}</p>
            </div>

            <div className={styles.content}>
                <p className={styles.description}>{description}</p>

                <div className={styles.capabilitiesSection}>
                    <h4 className={styles.capabilitiesTitle}>Key capabilities:</h4>
                    <ul className={styles.capabilitiesList}>
                        {capabilities.map((capability, index) => (
                            <li key={index} className={styles.capability}>{capability}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.stackSection}>
                    <span className={styles.techLabel}>Tech:</span>
                    <span className={styles.techStack}>{stack.join(" · ")}</span>
                </div>

                <div className={styles.linksSection}>
                    <span className={styles.linksLabel}>Links:</span>
                    <div className={styles.links}>
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkButton}
                            >
                                {getLinkIcon(link.type)}
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
