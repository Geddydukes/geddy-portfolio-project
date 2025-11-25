import Hero from "@/components/hero"
import ProjectCard from "@/components/project-card"
import ExperienceItem from "@/components/experience-item"
import SkillSection from "@/components/skill-section"
import { projects, experience, skills, me } from "@/content/portfolio"
import { Github, Linkedin, Mail } from "lucide-react"

import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Hero />

      <section id="projects" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Professional Experience</h2>
          <div className={styles.experienceWrapper}>
            {experience.map((item, index) => (
              <ExperienceItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Core Skills</h2>
          <div className={styles.skillsGrid}>
            <SkillSection title="Engineering" skills={skills.engineering} />
            <SkillSection title="AI Systems" skills={skills.aiSystems} />
            <SkillSection title="Delivery & Leadership" skills={skills.delivery} />
          </div>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className="container">
          <div className={styles.contactWrapper}>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <p className={styles.tagline}>
              {me.tagline}
            </p>
            <div className={styles.socialLinks}>
              <a
                href={`mailto:${me.email}`}
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail className="h-10 w-10" />
              </a>
              <a
                href={me.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-10 w-10" />
              </a>
              <a
                href={me.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github className="h-10 w-10" />
              </a>
            </div>
            <p className={styles.contactInfo}>
              {me.location} • {me.phone}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
