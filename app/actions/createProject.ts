'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import supabase from '../supabase'
import { addSideProjectFormErrors } from '@/constants'

export async function createProject(prevState: any, formData: FormData) {

  const schema = z.object({
    sideProjectName: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectDescription: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectTechStack: z.string().regex(/^\w+(,\w+)*$/, { message: 'daadadada' })
    // z.string().min(1, { message: 'side-project tech stack cannot be empty' }).includes(',', { message: 'input values should be comma separated.' })
  })

  const parse = schema.safeParse({
    sideProjectName: formData.get('sideProjectName'),
    sideProjectUrl: formData.get('sideProjectUrl'),
    sideProjectDescription: formData.get('sideProjectDescription'),
    sideProjectTechStack: formData.get('sideProjectTechStack'),
  })

  if (!parse.success) {
    console.log(parse.error.format());
    return { message: 'Failed to create side-project', errors: parse.error.format(), dbEror: '' }
  }

  const data = parse.data

  try {
    await supabase
      .from('side-projects')
      .insert([
        { name: data.sideProjectName },
      ]);

    revalidatePath('/')
    return { message: `Added side-project: ${data.sideProjectName}`, errors: addSideProjectFormErrors, dbEror: '' }
  } catch (e) {
    return { message: 'Failed to create side-project', dbEror: 'Db Error' }
  }
}