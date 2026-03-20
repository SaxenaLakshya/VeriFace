import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const client = createClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);