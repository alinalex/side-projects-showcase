'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import supabase from '../supabase'
import { CreateProjectState } from '@/types'

export async function createProject(prevState: CreateProjectState, formData: FormData) {

  const schema = z.object({
    sideProjectName: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectLogoUrl: z.string().min(1, { message: 'side-project logo URL cannot be empty.' }),
    sideProjectDescription: z.string().min(1, { message: 'side-project description cannot be empty.' }).max(60, { message: 'side-project description is too long.' }),
    sideProjectTagline: z.string().min(1, { message: 'side-project tagline cannot be empty.' }).max(60, { message: 'side-project tagline is too long.' }),
    sideProjectUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectCodeUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectTechStack: z.string().min(1, { message: 'side-project tech stack cannot be empty' }),
    sideProjectTopic: z.string().min(1, { message: 'side-project topic cannot be empty' }),
  })

  const parse = schema.safeParse({
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
    // console.log(parse.error.format());
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
    return { message: 'Failed to create side-project', errors: prevState.errors, dbEror: 'Db Error' }
  }
}