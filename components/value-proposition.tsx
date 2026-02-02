"use client"

import { motion } from "framer-motion"
import styles from "./value-proposition.module.css"

interface ValuePropositionProps {
    icon: string
    title: string
    description: string
    index: number
}

export default function ValueProposition({ icon, title, description, index }: ValuePropositionProps) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{icon}</span>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </motion.div>
    )
}
