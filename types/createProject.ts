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

export type SideProjectDBRow = {
  id: number;
  created_at: string;
  name: string;
  productUrl: string;
  logoUrl: string;
  description: string;
  tagline: string;
  repoUrl: string;
  techStack: string[];
  topics: string[],
  user_id: string;
  handler_id: number,
  url_id: string;
}

export type UserDataDb = {
  id: number;
  created_at: string;
  user_id: string;
  handler: string;
  first_name: string;
  last_name: string;
  description: string;
  profileImageUrl: string;
}