"use client"

import { motion } from "framer-motion"
import { me } from "@/content/portfolio"
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
        <motion.div
          className={styles.ctaButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="#projects"
            className={styles.primaryButton}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className={styles.secondaryButton}
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  )
}

