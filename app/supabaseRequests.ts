import { SideProject } from "@/types";
import supabaseClient from "./supabase";

export async function getSideProjects({ userId, token }: { userId: string | null | undefined, token: string | null }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('side-projects')
    .select('*')
    .eq("user_id", userId);
  return { data, error };
}

export async function getSideProject({ userId, token, urlId }: { userId: string | null | undefined, token: string | null, urlId: string }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('side-projects')
    .select('*')
    .eq("user_id", userId)
    .eq("url_id", urlId);

  let sideProjectData: SideProject[] = [];
  if (data !== null) {
    sideProjectData.push({
      sideProjectName: data[0].name,
      sideProjectUrl: data[0].productUrl,
      sideProjectLogoUrl: data[0].logoUrl,
      sideProjectDescription: data[0].description,
      sideProjectTagline: data[0].tagline,
      sideProjectCodeUrl: data[0].repoUrl,
      sideProjectTechStack: data[0].techStack.join(''),
      sideProjectTopic: data[0].topics.join(''),
    })
  }
  return { data: sideProjectData, error };
}

export async function getHandler({ userId, token }: { userId: string | null | undefined, token: string | null }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('handlers')
    .select('*')
    .eq("user_id", userId);
  const handlerData = data as { handler: string, user_id: string, id: string }[] | null;
  return { data: handlerData, error };
}

export async function addSideProject({ userId, token, sideProject, handlerId }: { userId: string | null | undefined, token: string | null, sideProject: SideProject, handlerId: string }) {
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
        user_id: userId,
        handler_id: handlerId,
      },
    ]);
  return { data, error };
}

export async function updateHandler({ userId, token, handler }: { userId: string | null | undefined, token: string | null, handler: string }) {

  // check if handler exists for this user
  const { data: userHandlerData, error: userHandlerError } = await getHandler({ userId, token });
  if (userHandlerError) return { data: null, error: userHandlerError };

  const supabase = await supabaseClient(token);
  let updateHandlerData, updateHandlerError;
  if (userHandlerData && userHandlerData?.length > 0) {
    const updateRes = await supabase
      .from('handlers')
      .update({ handler })
      .eq('user_id', userId);
    updateHandlerData = updateRes.data;
    updateHandlerError = updateRes.error;
  } else {
    const insertRes = await supabase
      .from('handlers')
      .insert([
        { handler, user_id: userId },
      ])
    updateHandlerData = insertRes.data;
    updateHandlerError = insertRes.error;
  }
  return { data: updateHandlerData, error: updateHandlerError };
}

export async function checkIfHandlerExists({ userId, token, handler }: { userId: string | null | undefined, token: string | null, handler: string }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('handlers')
    .select('*').eq('handler', handler).neq('user_id', userId);
  return { data, error };
}

export async function updateSideProject({ userId, token, sideProject, sideProjectId }: { userId: string | null | undefined, token: string | null, sideProject: SideProject, sideProjectId: string }) {

  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from('side-projects')
    .update({
      name: sideProject.sideProjectName,
      productUrl: sideProject.sideProjectUrl,
      logoUrl: sideProject.sideProjectLogoUrl,
      description: sideProject.sideProjectDescription,
      tagline: sideProject.sideProjectTagline,
      repoUrl: sideProject.sideProjectCodeUrl,
      techStack: sideProject.sideProjectTechStack.split(','),
      topics: sideProject.sideProjectTopic.split(','),
    })
    .eq('user_id', userId)
    .eq('url_id', sideProjectId);

  return { data, error };
}