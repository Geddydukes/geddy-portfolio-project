"use client"

import { motion } from "framer-motion"
import styles from "./skill-section.module.css"

interface SkillSectionProps {
  title: string
  skills: string[]
}

export default function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className={styles.skillBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

