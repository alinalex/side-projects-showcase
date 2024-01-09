import { getSideProject } from "@/app/supabaseRequests";
import ProjectForm from "@/components/createProject/ProjectForm";
import { getUserHandler, getUserId, getUserToken } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export default async function EditProject({ params }: { params: { sideProjectId: string } }) {
  const { handler, handlerId } = await getUserHandler();
  if (!handler.length) {
    redirect('/');
  }

  // get side project data
  const sideProjectId = params.sideProjectId;
  const userId = getUserId();
  const token = await getUserToken();
  const { data: sideProjectDataArray, error } = await getSideProject({ urlId: sideProjectId, userId, token });
  if (error || sideProjectDataArray === null) redirect('/dashboard/admin');
  const sideProjectData = sideProjectDataArray && sideProjectDataArray[0];

  return (
    <div className="max-w-xl">
      <div className="mb-4">Edit your side project</div>
      <ProjectForm type="edit" handler={handler} sideProjectId={sideProjectId} handlerId={handlerId} sideProjectData={sideProjectData} />
    </div>
  )
}