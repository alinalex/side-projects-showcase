import { z } from 'zod'
export const sideProjectSchema = z.object({
    sideProjectName: z.string().min(1, { message: 'side-project name cannot be empty.' }),
    sideProjectLogoUrl: z.string().min(1, { message: 'side-project logo URL cannot be empty.' }),
    sideProjectDescription: z.string().min(1, { message: 'side-project description cannot be empty.' }).max(60, { message: 'side-project description is too long.' }),
    sideProjectTagline: z.string().min(1, { message: 'side-project tagline cannot be empty.' }).max(60, { message: 'side-project tagline is too long.' }),
    sideProjectUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectCodeUrl: z.string().url({ message: 'invalid side-project url.' }),
    sideProjectTechStack: z.string().min(1, { message: 'side-project tech stack cannot be empty' }),
    sideProjectTopic: z.string().min(1, { message: 'side-project topic cannot be empty' }),
})