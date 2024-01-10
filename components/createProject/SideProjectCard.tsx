import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { SideProjectDBRow } from "@/types";

export default function SideProjectCard({ project, handler }: { project: SideProjectDBRow, handler: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center group">
          <Avatar>
            <AvatarImage src={project.logoUrl} />
            <AvatarFallback>{project.name?.slice(0, 2)?.toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="ml-2">{project.name}</CardTitle>
          <Link href={project.productUrl} className="ml-4" target="_blank"><ArrowUpRight className="transform transition-transform duration-300 group-hover:-rotate-12" /></Link>
        </div>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <p className="mb-2">Tech Stack:</p>
          <div className="truncate" title={project.techStack?.join(', ')}>
            {project.techStack?.map((stack: string, index: number) => (
              <span key={index} className={`${index > 0 && 'ml-3'}`}>{stack}</span>
            ))}
          </div>
        </div>
        <div>
          <div>
            {project.topics?.map((hashTag: string, index: number) => (
              <span key={index} className={`${index > 0 && 'ml-3'} italic`}>#{hashTag}</span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/${handler}/${project.url_id}`}>See more</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}