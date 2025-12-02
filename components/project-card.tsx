import { ExternalLink, Github, Globe, Package, BookOpen, FileText } from "lucide-react"
import { Project } from "@/content/portfolio"
import styles from "./project-card.module.css"

export default function ProjectCard({ name, tagline, status, stack, summary, highlights, links, featured }: Project) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{name}</h3>
          <span className={`${styles.badge} ${status === "live" ? styles.badgeLive : styles.badgeSecondary}`}>
            {status}
          </span>
        </div>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.stack}>
          {stack.map((tech) => (
            <span key={tech} className={styles.stackBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        {highlights && highlights.length > 0 && (
          <ul className={styles.highlights}>
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.footer}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            {link.type === "github" && <Github className="h-4 w-4" />}
            {link.type === "npm" && <Package className="h-4 w-4" />}
            {link.type === "site" && <Globe className="h-4 w-4" />}
            {link.type === "demo" && <ExternalLink className="h-4 w-4" />}
            {link.type === "docs" && <BookOpen className="h-4 w-4" />}
            {link.type === "blog" && <FileText className="h-4 w-4" />}
            {link.label || (link.type.charAt(0).toUpperCase() + link.type.slice(1))}
          </a>
        ))}
      </div>
    </div>
  )
}

