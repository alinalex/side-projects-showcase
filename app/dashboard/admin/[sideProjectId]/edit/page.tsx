import { getSideProject } from "@/app/supabaseRequests";
import ProjectForm from "@/components/createProject/ProjectForm";
import FormShell from "@/components/shared/FormShell";
import { getUserData, getUserId, getUserToken } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export default async function EditProject({ params }: { params: { sideProjectId: string } }) {
  const userId = getUserId() as string;
  const { userData } = await getUserData({ userId });
  if (!userData.length) {
    redirect('/');
  }

  const handler = userData[0].handler;
  const handlerId = userData[0].id.toString();

  // get side project data
  const sideProjectId = params.sideProjectId;
  const token = await getUserToken();
  const { data: sideProjectDataArray, error } = await getSideProject({ urlId: sideProjectId, userId, token });
  if (error || sideProjectDataArray === null) redirect('/dashboard/admin');
  const sideProjectData = sideProjectDataArray && sideProjectDataArray[0];

  return (
    <FormShell>
      <div className="form-title">Edit your side project</div>
      <ProjectForm type="edit" handler={handler} sideProjectId={sideProjectId} handlerId={handlerId} sideProjectData={sideProjectData} />
    </FormShell>
  )
}