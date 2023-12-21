import { createServerClient } from "@supabase/ssr";

const supabaseClient = async (supabaseToken: string | null) => {
    const global = supabaseToken === null ? {} : { headers: { Authorization: `Bearer ${supabaseToken}` } }
    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        { cookies: {}, global }
    )
    return supabase;
}

export default supabaseClient;