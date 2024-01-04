import { z } from 'zod'
export const sideProjectSchema = z.object({
  sideProjectName: z.string().min(1, { message: 'side-project name cannot be empty.' }).max(40, { message: 'side-project name is too long.' }),
  sideProjectLogoUrl: z.string().min(1, { message: 'side-project logo URL cannot be empty.' }),
  sideProjectDescription: z.string().min(1, { message: 'side-project description cannot be empty.' }).max(260, { message: 'side-project description is too long.' }),
  sideProjectTagline: z.string().min(1, { message: 'side-project tagline cannot be empty.' }).max(60, { message: 'side-project tagline is too long.' }),
  sideProjectUrl: z.string().url({ message: 'invalid side-project url.' }),
  sideProjectCodeUrl: z.string().url({ message: 'invalid side-project url.' }),
  sideProjectTechStack: z.string().min(1, { message: 'side-project tech stack cannot be empty' }),
  sideProjectTopic: z.string().min(1, { message: 'side-project topic cannot be empty' }),
})

export const userInfoSchema = z.object({
  firstName: z.string().min(1, { message: 'first name cannot be empty.' }).max(20, { message: 'first name is too long.' }),
  lastName: z.string().min(1, { message: 'last name cannot be empty.' }).max(20, { message: 'last name is too long.' }),
  imageSrc: z.string().min(1, { message: 'avatar URL cannot be empty.' }),
  description: z.string().min(1, { message: 'description cannot be empty.' }).max(60, { message: 'description is too long.' }),
  handler: z.string().min(1, { message: 'handler cannot be empty.' }).max(20, { message: 'handler is too long.' }),
})