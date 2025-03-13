import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  link: string
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      <div className="p-4 mt-auto">
        <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            View Project <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  )
}

