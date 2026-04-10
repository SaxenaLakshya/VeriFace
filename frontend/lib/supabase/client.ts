import { createClient } from "@supabase/supabase-js";

const supabase = createClient<any>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default supabase;