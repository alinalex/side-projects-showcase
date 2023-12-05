'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import supabase from '../supabase'
import { addSideProjectFormErrors } from '@/constants'

export async function createProject(prevState: any, formData: FormData) {

  const schema = z.object({
    sideProjectName: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectCodeUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectDescription: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectTechStack: z.string().min(1, { message: 'side-project tech stack cannot be empty' }),
    sideProjectTopic: z.string().min(1, { message: 'side-project topic cannot be empty' }),
  })

  const parse = schema.safeParse({
    sideProjectName: formData.get('sideProjectName'),
    sideProjectUrl: formData.get('sideProjectUrl'),
    sideProjectCodeUrl: formData.get('sideProjectCodeUrl'),
    sideProjectDescription: formData.get('sideProjectDescription'),
    sideProjectTechStack: formData.get('sideProjectTechStack'),
    sideProjectTopic: formData.get('sideProjectTopic'),
  })

  if (!parse.success) {
    // console.log(parse.error.format());
    return { message: 'Failed to create side-project', errors: parse.error.format(), dbEror: '' }
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
    return { message: `Added side-project: ${data.sideProjectName}`, errors: addSideProjectFormErrors, dbEror: '' }
  } catch (e) {
    return { message: 'Failed to create side-project', errors: addSideProjectFormErrors, dbEror: 'Db Error' }
  }
}