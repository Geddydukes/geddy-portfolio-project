"use client"

import { motion } from "framer-motion"

interface SkillSectionProps {
  title: string
  skills: string[]
}

export default function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className="bg-primary text-white px-3 py-1 rounded-full text-sm"
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

