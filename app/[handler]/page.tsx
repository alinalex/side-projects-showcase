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
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { getSideProjects } from "../supabaseRequests"
import { currentUser, SignOutButton, UserButton } from "@clerk/nextjs"
import { getUserId, getUserToken } from "@/lib/authUtils"

export default async function Showcase() {
  const userId = getUserId();
  const token = await getUserToken();
  // const user = await currentUser();
  const { data: sideProjectsData, error } = await getSideProjects({ userId, token })

  // await clerkClient.users.updateUser(userId as string, { unsafeMetadata: { description: 'test' } });
  // console.log('data', sideProjectsData);
  // console.log('error', error);

  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <section className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <p className="text-lg mt-2">First Name and Last Name</p>
        <p className="text-lg mt-2">Summary or description of some sort</p>
      </section>
      <section className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6 gap-x-0">
        {error ? <div>there was an error getting your side projects, please try again later.</div> : sideProjectsData?.map(project => (
          <div key={project.name}>
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
                  <Link href={`/${project.name}`}>See more</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </section>
    </>
  )
}