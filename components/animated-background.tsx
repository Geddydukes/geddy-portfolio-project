"use client"

import { useEffect, useState } from "react"
import styles from "./animated-background.module.css"

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className={styles.backgroundWrapper}>
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />
            <div className={styles.gridOverlay} />
        </div>
    )
}
