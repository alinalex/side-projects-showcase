import { SideProject } from "@/types";
import supabaseClient from "./supabase";

export async function getSideProjects({ userId, token }: { userId: string | null | undefined, token: string | null }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('side-projects')
    .select('*')
  // .eq("user_id", userId);
  return { data, error };
}

export async function getHandler({ userId, token }: { userId: string | null | undefined, token: string | null }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('handlers')
    .select('*')
    .eq("user_id", userId);
  return { data, error };
}

export async function addSideProject({ userId, token, sideProject }: { userId: string | null | undefined, token: string | null, sideProject: SideProject }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from('side-projects')
    .insert([
      {
        name: sideProject.sideProjectName,
        productUrl: sideProject.sideProjectUrl,
        logoUrl: sideProject.sideProjectLogoUrl,
        description: sideProject.sideProjectDescription,
        tagline: sideProject.sideProjectTagline,
        repoUrl: sideProject.sideProjectCodeUrl,
        techStack: sideProject.sideProjectTechStack.split(','),
        topics: sideProject.sideProjectTopic.split(','),
        user_id: userId
      },
    ]);
  return { data, error };
}

export async function updateHandler({ userId, token, handler }: { userId: string | null | undefined, token: string | null, handler: string }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('handlers')
    .upsert({ handler: handler, user_id: userId })

  return { data, error };
}