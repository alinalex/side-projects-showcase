import ProjectForm from "@/components/createProject/ProjectForm";
import { getUserHandler } from "@/lib/authUtils";
import { redirect } from "next/navigation";

export default async function AddProject() {
  const { handler, handlerId } = await getUserHandler();
  if (!handler.length) {
    redirect('/');
  }
  return (
    <div className="max-w-xl">
      <div className="mb-4">Add your side project</div>
      <ProjectForm type="add" handler={handler} handlerId={handlerId} />
    </div>
  )
}