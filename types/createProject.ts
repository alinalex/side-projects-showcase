import { ZodFormattedError } from "zod";

export type CreateProjectState = {
  message: string,
  errors: ZodFormattedError<SideProject, string>,
  dbError: string
}

export type SideProject = {
  sideProjectName: string;
  sideProjectLogoUrl: string;
  sideProjectTagline: string;
  sideProjectDescription: string;
  sideProjectUrl: string;
  sideProjectCodeUrl: string;
  sideProjectTechStack: string;
  sideProjectTopic: string;
}