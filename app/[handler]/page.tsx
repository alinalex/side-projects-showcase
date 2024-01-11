import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { getSideProjects, getUserDataFromDB } from "../supabaseRequests"
import { SignedIn, SignOutButton } from "@clerk/nextjs"
import SideProjectCard from "@/components/createProject/SideProjectCard"
import { redirect } from "next/navigation";

export default async function Showcase({ params }: { params: { handler: string } }) {
  const handler = params.handler;
  const { data: userData, error: userDataError } = await getUserDataFromDB({ column: "handler", columnValue: handler });
  if (userDataError || (userData && !userData.length)) {
    redirect('/')
  }

  const user = userData[0];
  const name = user?.first_name + ' ' + user?.last_name;
  const avatarFallback = (user?.first_name?.charAt(0).toUpperCase() || '') + (user?.last_name?.charAt(0).toUpperCase() || '');
  const description = user?.description;
  const { data: sideProjectsData, error } = await getSideProjects({ userId: user.user_id });
  const profileImage = user?.profileImageUrl;

  return (
    <>
      <SignedIn>
        <div className="flex justify-between items-center">
          <Link href='/dashboard/admin'>Go to dashboard</Link>
          <SignOutButton />
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