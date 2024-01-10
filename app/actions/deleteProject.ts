'use server'
import { revalidatePath } from 'next/cache'
import { deleteSideProject } from "../supabaseRequests";

export async function deleteProject({ userId, token, sideProjectId }: { userId: string, token: string, sideProjectId: string }) {
  let response = true;
  const { data, error } = await deleteSideProject({ userId, token, sideProjectId });
  if (error) {
    response = false;
  } else {
    revalidatePath('/dashboard/admin');
  }

  return { response };
}