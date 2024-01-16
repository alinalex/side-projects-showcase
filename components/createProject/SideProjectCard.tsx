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
    <Card className="bg-white dark:bg-white border-transparent dark:border-transparent shadow-lg">
      <CardHeader className="pb-4">
        <Link href={project.productUrl} className="w-fit" target="_blank">
          <div className="flex items-center group">
            <Avatar>
              <AvatarImage src={project.logoUrl} />
              <AvatarFallback>{project.name?.slice(0, 2)?.toLocaleUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="ml-3 text-xl text-title">{project.name}</CardTitle>
            <ArrowUpRight color="#269684" className="ml-3 transform transition-transform duration-300 group-hover:-rotate-12" />
          </div>
        </Link>
        <CardDescription className="text-md text-content">{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mb-4">
          <div>
            {project.topics?.map((hashTag: string, index: number) => (
              <span key={index} className={`text-content text-md ${index > 0 && 'ml-3'} italic`}>#{hashTag}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-content text-md font-medium">Tech Stack:</p>
          <div className="truncate" title={project.techStack?.join(', ')}>
            {project.techStack?.map((stack: string, index: number) => (
              <span key={index} className={`text-content text-md ${index > 0 && 'ml-3'}`}>{stack}</span>
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