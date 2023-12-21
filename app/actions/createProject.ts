'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import supabase from '../supabase'
import { CreateProjectState } from '@/types'
import { sideProjectSchema } from '@/zodSchemas/formSchemas'

export async function createProject(prevState: CreateProjectState, formData: FormData) {

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
    const { data: response, error } = await supabase
      .from('side-projects')
      .insert([
        {
          name: data.sideProjectName,
          productUrl: data.sideProjectUrl,
          logoUrl: data.sideProjectLogoUrl,
          description: data.sideProjectDescription,
          tagline: data.sideProjectTagline,
          repoUrl: data.sideProjectCodeUrl,
          techStack: data.sideProjectTechStack.split(','),
          topics: data.sideProjectTopic.split(','),
        },
      ]);
    if (error) throw error;
  } catch (e) {
    databaseSuccess = false;
  } finally {
    if (databaseSuccess) {
      revalidatePath('/')
      redirect('/');
    }
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }
}