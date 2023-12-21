import supabaseClient from "./supabase";

export async function getSideProjects({ userId, token }: { userId: string | null | undefined, token: string | null }) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase.from('side-projects')
        .select('*')
    // .eq("user_id", userId);
    return { data, error };
}