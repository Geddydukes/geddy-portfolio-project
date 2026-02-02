import Hero from "@/components/hero"
import FeaturedProjectCard from "@/components/featured-project-card"
import ValueProposition from "@/components/value-proposition"
import ExperienceItem from "@/components/experience-item"
import SkillSection from "@/components/skill-section"
import AnalyticsTracker from "@/components/analytics-tracker"
import { projects, experience, skills, me, valuePropositions, contactInfo } from "@/content/portfolio"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <AnalyticsTracker page="home" />
      <Hero />

      {/* What I Bring Section */}
      <section id="value" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What I Bring to Your Team</h2>
          <p className={styles.sectionSubtitle}>
            Most ML engineers can train models. Few understand how to deploy them where errors cost money or violate regulations.
          </p>
          <div className={styles.valueGrid}>
            {valuePropositions.map((prop, index) => (
              <ValueProposition key={index} {...prop} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.featuredProjectsGrid}>
            {projects.map((project, index) => (
              <FeaturedProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
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

      {/* Skills Section */}
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

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <div className="container">
          <div className={styles.contactWrapper}>
            <h2 className={styles.sectionTitle}>{contactInfo.heading}</h2>
            <p className={styles.contactBody}>{contactInfo.body}</p>
            <p className={styles.locationText}>{contactInfo.location}</p>

            <div className={styles.ctaButtons}>
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
            </div>

            <div className={styles.contactInfo}>
              <p>{me.email} · {me.phone}</p>
            </div>

            <div className={styles.socialLinks}>
              <a
                href={`mailto:${me.email}`}
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail className="h-8 w-8" />
              </a>
              <a
                href={me.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a
                href={me.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github className="h-8 w-8" />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
