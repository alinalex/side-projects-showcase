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

const dummyProjectsData = [
  {
    logoSrc: '',
    title: 'Dummy Project 1',
    projectLink: 'https://dummyProjectOne.com',
    description: 'This is a description for Dummy Project 1',
    techStack: ['React JS', 'Next JS', 'Node JS', 'MongoDB', 'Tailwind CSS', 'React Query'],
    hashTags: ['open-source', 'fun', 'productivity'],
  },
  {
    logoSrc: '',
    title: 'Dummy Project 2',
    projectLink: 'https://dummyProjectTwo.com',
    description: 'This is a description for Dummy Project 2',
    techStack: ['React JS', 'Next JS', 'Node JS', 'MongoDB', 'Tailwind CSS'],
    hashTags: ['open-source', 'fun', 'productivity'],
  }
]

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <p className="text-lg mt-2">First Name and Last Name</p>
        <p className="text-lg mt-2">Summary or description of some sort</p>
      </section>
      <section className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6 gap-x-0">
        {dummyProjectsData?.map(project => (
          <div key={project.title}>
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={project.logoSrc} />
                    <AvatarFallback>{project.title?.slice(0, 2)?.toLocaleUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="ml-2">{project.title}</CardTitle>
                  <Link href={project.projectLink} className="ml-4" target="_blank">Visit</Link>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <p className="mb-2">Tech Stack:</p>
                  <div className="truncate" title={project.techStack.join(', ')}>
                    {project.techStack?.map((stack, index) => (
                      <span className={`${index > 0 && 'ml-3'}`}>{stack}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div>
                    {project.hashTags?.map((hashTag, index) => (
                      <span className={`${index > 0 && 'ml-3'} italic`}>#{hashTag}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/${project.title}`}>See more</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </section>
    </>
  )
}
