'use server'
import { revalidatePath } from 'next/cache'
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
    return { message: 'Failed to create side-project', errors: parse.error.format(), dbEror: prevState.dbEror }
  }

  const data = parse.data

  try {
    await supabase
      .from('side-projects')
      .insert([
        {
          name: data.sideProjectName,
          tech_stack: data.sideProjectTechStack.split(','),
          topics: data.sideProjectTopic.split(','),
        },
      ]);

    revalidatePath('/')
    return { message: `Added side-project: ${data.sideProjectName}`, errors: prevState.errors, dbEror: prevState.dbEror }
  } catch (e) {
    return { message: 'Failed to create side-project', errors: prevState.errors, dbEror: 'An error occured, please try again.' }
  }
}