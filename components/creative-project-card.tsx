"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github, Gamepad2 } from "lucide-react"
import type { CreativeProject } from "@/content/creative"
import styles from "./featured-project-card.module.css"

function LinkIcon({ href, label }: { href: string; label: string }) {
    if (href.includes("github.com")) return <Github className="h-4 w-4" />
    if (href.startsWith("/")) return <Gamepad2 className="h-4 w-4" aria-label={label} />
    return <ExternalLink className="h-4 w-4" />
}

export default function CreativeProjectCard({
    name,
    label,
    kind,
    impactStatement,
    description,
    highlights,
    stack,
    links,
    image,
}: CreativeProject) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginBottom: "1.5rem" }} />
            )}
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.techStack}>{kind}</p>
                <p className={styles.impactStatement}>{impactStatement}</p>
            </div>

            <div className={styles.content}>
                <p className={styles.description}>{description}</p>

                <div className={styles.capabilitiesSection}>
                    <h4 className={styles.capabilitiesTitle}>Design &amp; engineering highlights:</h4>
                    <ul className={styles.capabilitiesList}>
                        {highlights.map((item, index) => (
                            <li key={index} className={styles.capability}>{item}</li>
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
                        {links.map((link, index) =>
                            link.href.startsWith("/") ? (
                                <Link key={index} href={link.href} className={styles.linkButton}>
                                    <LinkIcon href={link.href} label={link.label} />
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkButton}
                                >
                                    <LinkIcon href={link.href} label={link.label} />
                                    {link.label}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
