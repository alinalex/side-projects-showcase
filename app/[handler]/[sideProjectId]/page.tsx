import { getSideProjectItem } from "@/app/supabaseRequests";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserId, getUserToken } from "@/lib/authUtils";
import { redirect } from "next/navigation";
import Link from "next/link"

export default async function SideProjectItem({ params }: { params: { sideProjectId: string, handler: string } }) {
  const sideProjectId = params.sideProjectId;
  const handler = params.handler;
  const userId = getUserId();
  const token = await getUserToken();
  const { data, error } = await getSideProjectItem({ userId, token, urlId: sideProjectId });
  if (error || data === null || (Array.isArray(data) && data.length === 0)) redirect(`/${handler}`);
  const project = data[0];
  return (
    <section>
      <Avatar>
        <AvatarImage src={project.logoUrl} />
        <AvatarFallback>{project.name?.slice(0, 2)?.toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <p>{project.name}</p>
      <p>{project.tagline}</p>
      <p>{project.description}</p>
      <div>
        <Link href={project.repoUrl} target="_blank">Repo link</Link>
      </div>
      <div>
        <Link href={project.productUrl} target="_blank">Product link</Link>
      </div>
      <div className="truncate" title={project.techStack?.join(', ')}>
        {project.techStack?.map((stack: string, index: number) => (
          <span key={index} className={`${index > 0 && 'ml-3'}`}>{stack}</span>
        ))}
      </div>
      <div>
        <div>
          {project.topics?.map((hashTag: string, index: number) => (
            <span key={index} className={`${index > 0 && 'ml-3'} italic`}>#{hashTag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}