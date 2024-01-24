import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSideProjects, getUserDataFromDB } from "../supabaseRequests"
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
      <section className="flex flex-col items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profileImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="text-lg md:text-xl font-medium mt-2 text-title">{name}</p>
        <p className="text-sm md:text-base mt-2 max-w-xl text-content">{description}</p>
      </section>
      <section className="my-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-6 gap-x-0">
        {error ? <div>there was an error getting your side projects, please try again later.</div> : sideProjectsData?.map(project => (
          <SideProjectCard project={project} key={project.name} handler={handler} />
        ))}
      </section>
    </>
  )
}