"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./header.module.css"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleNavClick = (item: string) => {
    const sectionId = item.toLowerCase()

    if (!isHomePage) {
      // Navigate to homepage with hash
      window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`
    } else {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        scrollToSection(sectionId)
      }
    }
    setIsOpen(false)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Geddy Dukes
          </motion.span>
        </Link>
        <div className={styles.mobileButton}>
          <button onClick={() => setIsOpen(!isOpen)} className={styles.mobileButton}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" width="24" height="24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            {["Home", "Projects", "Experience", "Skills", "Contact"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleNavClick(item)}
                  className={styles.navButton}
                >
                  {item}
                </button>
              </motion.li>
            ))}
            <motion.li
              key="blog"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 5 * 0.1 }}
            >
              <Link href="/blog" className={styles.navButton}>
                Blog
              </Link>
            </motion.li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

