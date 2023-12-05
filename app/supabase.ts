import { createServerClient } from "@supabase/ssr";

const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { cookies: {} }
)

export default supabase;