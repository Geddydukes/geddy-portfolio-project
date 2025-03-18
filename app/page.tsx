import Hero from "@/components/hero"
import ProjectCard from "@/components/project-card"
import ExperienceItem from "@/components/experience-item"
import SkillSection from "@/components/skill-section"

const projects = [
  {
    title: "CourtedAI - AI-Powered Date Planning Platform",
    description:
      "Developed a full-stack web application that leverages AI to provide personalized date suggestions and planning. Built with Next.js, features include smart reminders, preference matching, and AI-powered recommendations.",
    technologies: ["Next.js", "AI Integration", "React", "TypeScript", "Tailwind CSS"],
    link: "https://courtedai.com",
  },
  {
    title: "Equity Scorecard Web Portal",
    description:
      "Co-led the project management of an equity scorecard web portal using Scrum practices, resulting in a 30% increase in program adoption.",
    technologies: ["Scrum", "Web Development", "Data Analysis"],
    link: "#",
  },
  {
    title: "Grant Pool Portfolio Management System",
    description:
      "Developed and implemented a system to manage a $30M grant pool portfolio, increasing grant approvals by 25%.",
    technologies: ["Financial Modeling", "Data Analysis", "Risk Management"],
    link: "#",
  },
  {
    title: "Credit Risk Analysis Tool",
    description:
      "Created a comprehensive credit analysis tool that improved clients' financial health, leading to a 15% reduction in credit risk.",
    technologies: ["Python", "SQL", "Financial Analysis"],
    link: "#",
  },
]

const experiences = [
  {
    title: "Program Manager, Catalytic Capital & Credit Analyst",
    company: "Community Vision",
    period: "Dec 2023 - Present",
    responsibilities: [
      "Improved clients' financial health by conducting comprehensive credit analyses, leading to a 15% reduction in credit risk.",
      "Increased program adoption by 30% by co-leading the project management of an equity scorecard web portal using Scrum practices.",
      "Managed a $30M grant pool portfolio, underwriting deals up to $3M, increasing grant approvals by 25%.",
      "Nominated as a member of the Leadership & Culture and Learning & Evaluation committees to enhance organization effectiveness.",
      "Maintained stakeholder relationships, ensuring 100% on-time delivery rate of project objectives.",
    ],
  },
  {
    title: "Catalytic Capital Technical Program Analyst",
    company: "Community Vision",
    period: "Jun 2022 - Dec 2023",
    responsibilities: [
      "Coordinated analysis plans for programs totaling up to $100M, ensuring on-time and within-scope delivery.",
      "Enhanced program efficiency by 20% through developing financial models and conducting data analysis.",
      "Secured 15% additional funding by communicating key insights to senior management.",
      "Designed updated stakeholder management strategies, achieving 100% satisfaction rate.",
    ],
  },
  {
    title: "Finance Project Manager",
    company: "Dorjil Company",
    period: "May 2020 - Oct 2021",
    responsibilities: [
      "Secured $400K in subsidies by analyzing data using Python and SQL, creating reports that met government regulations.",
      "Improved internal process efficiency by 25% by implementing data collection, validation, and analysis solutions.",
      "Designed and implemented financial forecasting models, achieving 99% accuracy, a 15% overall increase.",
    ],
  },
  {
    title: "Full Stack Software Engineer",
    company: "Blindly",
    period: "Jun 2020 - Sep 2020",
    responsibilities: [
      "Enhanced user verification processes by developing ID parsing solutions using a Node.js backend.",
      "Partnered with frontend development working on web and mobile presence using React and React Native.",
    ],
  },
]

const skills = {
  project: [
    "Project Planning",
    "Risk Mitigation Strategies",
    "Project Delivery",
    "Project Prioritization",
    "Scrum",
    "Kanban",
    "Agile Development",
  ],
  leadership: [
    "Relationship Management",
    "Innovation",
    "Conflict Resolution",
    "Market Research",
    "Problem-Solving",
    "Analytical Thinking",
    "Coaching & Mentoring",
    "Organizational Skills",
  ],
  technical: ["Python", "SQL", "AWS", "Web Development", "Financial Modeling", "Data Analysis", "Data Collection"],
}

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="projects" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceItem key={index} {...experience} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Core Skills</h2>
          <SkillSection title="Project Management" skills={skills.project} />
          <SkillSection title="Leadership" skills={skills.leadership} />
          <SkillSection title="Technical Skills" skills={skills.technical} />
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:geddydukes@gmail.com"
              className="text-primary hover:text-primary-dark transition-colors duration-200"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/geddy-dukes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors duration-200"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

