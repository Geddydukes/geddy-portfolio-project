"use client"

import { motion } from "framer-motion"
import { me } from "@/content/portfolio"
import { FileText, Mail } from "lucide-react"
import styles from "./hero.module.css"

export default function Hero() {
  return (
    <div id="home" className={styles.heroWrapper}>
      <div className="container">
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {me.name}
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {me.tagline}
        </motion.p>
        <motion.p
          className={styles.socialProof}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <a href={me.socialProofLink} className={styles.socialProofBadge}>
            ✨ {me.socialProof}
          </a>
        </motion.p>
        <motion.div
          className={styles.ctaButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href={me.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            <FileText className="h-5 w-5" />
            Resume (PDF)
          </a>
          <a
            href={`mailto:${me.email}`}
            className={styles.secondaryButton}
          >
            <Mail className="h-5 w-5" />
            Hire me
          </a>
        </motion.div>
      </div>
    </div>
  )
}
