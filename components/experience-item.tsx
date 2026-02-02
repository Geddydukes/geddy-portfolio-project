"use client"

import { motion } from "framer-motion"
import { ExperienceItem as ExperienceItemType } from "@/content/portfolio"
import styles from "./experience-item.module.css"

export default function ExperienceItem({ company, role, range, location, bullets, highlight }: ExperienceItemType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.role}>{role}</h3>
            <p className={styles.company}>{company}</p>
          </div>
          <div className={styles.meta}>
            <p className={styles.range}>{range}</p>
            {location && <p className={styles.location}>{location}</p>}
          </div>
        </div>
        <ul className={styles.bullets}>
          {bullets.map((bullet, index) => (
            <li key={index} className={styles.bullet}>{bullet}</li>
          ))}
        </ul>
        {highlight && (
          <div className={styles.highlightWrapper}>
            <span className={styles.highlightBadge}>Highlight</span>
            <p className={styles.highlightText}>{highlight}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

