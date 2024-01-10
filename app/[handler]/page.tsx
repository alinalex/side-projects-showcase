import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { getSideProjects } from "../supabaseRequests"
import { currentUser, SignedIn, UserButton } from "@clerk/nextjs"
import { getUserId, getUserToken } from "@/lib/authUtils"
import SideProjectCard from "@/components/createProject/SideProjectCard"

export default async function Showcase({ params }: { params: { handler: string } }) {
  const userId = getUserId();
  const token = await getUserToken();
  const user = await currentUser();
  const name = user?.firstName + ' ' + user?.lastName;
  const avatarFallback = (user?.firstName?.charAt(0).toUpperCase() || '') + (user?.lastName?.charAt(0).toUpperCase() || '');
  const description = user?.unsafeMetadata.description as string;
  const { data: sideProjectsData, error } = await getSideProjects({ userId, token });
  const profileImage = user?.imageUrl;
  const handler = params.handler;

  return (
    <>
      <SignedIn>
        <div className="flex justify-between items-center">
          <Link href='/dashboard/admin'>Go to dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <section className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src={profileImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="text-lg mt-2">{name}</p>
        <p className="text-lg mt-2">{description}</p>
      </section>
      <section className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6 gap-x-0">
        {error ? <div>there was an error getting your side projects, please try again later.</div> : sideProjectsData?.map(project => (
          <SideProjectCard project={project} key={project.name} handler={handler} />
        ))}
      </section>
    </>
  )
}