'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CreateProjectState } from '@/types'
import { sideProjectSchema } from '@/zodSchemas/formSchemas'
import { getUserId, getUserToken } from '@/lib/authUtils'
import { addSideProject, updateSideProject } from '../supabaseRequests'

export async function createProject(type: string, handler: string, sideProjectId: string, handlerId: string, prevState: CreateProjectState, formData: FormData) {
  const parse = sideProjectSchema.safeParse({
    sideProjectName: formData.get('sideProjectName'),
    sideProjectLogoUrl: formData.get('sideProjectLogoUrl'),
    sideProjectDescription: formData.get('sideProjectDescription'),
    sideProjectTagline: formData.get('sideProjectTagline'),
    sideProjectUrl: formData.get('sideProjectUrl'),
    sideProjectCodeUrl: formData.get('sideProjectCodeUrl'),
    sideProjectTechStack: formData.get('sideProjectTechStack'),
    sideProjectTopic: formData.get('sideProjectTopic'),
  })

  if (!parse.success) {
    return { message: 'Failed to create side-project', errors: parse.error.format(), dbError: prevState.dbError }
  }

  const data = parse.data
  let databaseSuccess = true;
  try {
    const userId = getUserId();
    const token = await getUserToken();
    const { data: response, error } = type === 'add' ? await addSideProject({ userId, token, sideProject: data, handlerId }) : await updateSideProject({ userId, token, sideProject: data, sideProjectId });
    if (error) throw error;
  } catch (e) {
    databaseSuccess = false;
  } finally {
    if (databaseSuccess) {
      revalidatePath('/dashboard/admin');
      revalidatePath(`/${handler}`);
      redirect('/dashboard/admin');
    }
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }
}