import { getSideProjectItem, getUserDataFromDB } from "@/app/supabaseRequests";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserId, getUserToken } from "@/lib/authUtils";
import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button";

export default async function SideProjectItem({ params }: { params: { sideProjectId: string, handler: string } }) {
  const handler = params.handler;
  const sideProjectId = params.sideProjectId;
  const { data: userData, error: userDataError } = await getUserDataFromDB({ column: "handler", columnValue: handler });
  if (userDataError || (userData && !userData.length)) {
    redirect(`/${handler}`);
  }

  const user = userData[0];
  const userId = user.user_id;

  const { data, error } = await getSideProjectItem({ userId, urlId: sideProjectId });
  if (error || data === null || (Array.isArray(data) && data.length === 0)) redirect(`/${handler}`);
  const project = data[0];
  return (
    <section className="max-w-3xl mx-auto mt-6">
      <Avatar className="w-20 h-20">
        <AvatarImage src={project.logoUrl} />
        <AvatarFallback>{project.name?.slice(0, 2)?.toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col sm:flex-row justify-between mb-6 mt-3">
        <div>
          <p className="text-xl sm:text-2xl font-medium text-title">{project.name}</p>
          <p className="text-lg sm:text-xl mt-2 text-content">{project.tagline}</p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <Button asChild variant={'outline'}>
            <Link href={project.repoUrl} target="_blank" className="">Repo link</Link>
          </Button>
          <Button asChild>
            <Link href={project.productUrl} target="_blank" className="ml-3">Product link</Link>
          </Button>
        </div>
      </div>
      <p className="text-base sm:text-lg text-content mb-3">{project.description}</p>
      <div className="mb-4 border shadow-lg rounded-lg p-3">
        <p className="font-medium text-lg mb-2">Tech stack</p>
        <div className="flex flex-wrap content-start">
          {project.techStack?.map((stack: string, index: number) => (
            <span key={index} className={`text-content text-md px-2 border rounded-xl bg-[#eef2ff] mb-2 mr-2`}>{stack}</span>
          ))}
        </div>
      </div>
      <div className="mb-4 border shadow-lg rounded-lg p-3">
        <p className="font-medium text-lg mb-2">Topics</p>
        <div className="flex flex-wrap content-start">
          {project.topics?.map((hashTag: string, index: number) => (
            <span key={index} className={`text-content text-md px-2 border rounded-xl bg-[#eef2ff] mb-2 mr-2`}>#{hashTag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}