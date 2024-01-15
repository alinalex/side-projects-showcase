import ProjectForm from "@/components/createProject/ProjectForm";
import FormShell from "@/components/shared/FormShell";
import { getUserData, getUserId } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export default async function AddProject() {
  const userId = getUserId() as string;
  const { userData } = await getUserData({ userId });
  if (!userData.length) {
    redirect('/');
  }

  const handler = userData[0].handler;
  const handlerId = userData[0].id.toString();
  return (
    <FormShell>
      <div className="form-title">Add your side project</div>
      <ProjectForm type="add" handler={handler} handlerId={handlerId} />
    </FormShell>
  )
}