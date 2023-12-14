import { ZodFormattedError } from "zod";

export type CreateProjectState = {
    message: string,
    errors: ZodFormattedError<{
        sideProjectName: string;
        sideProjectLogoUrl: string;
        sideProjectTagline: string;
        sideProjectDescription: string;
        sideProjectUrl: string;
        sideProjectCodeUrl: string;
        sideProjectTechStack: string;
        sideProjectTopic: string;
    }, string>,
    dbEror: string
}