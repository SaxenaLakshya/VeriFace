import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import dotenv from "dotenv";

dotenv.config();

export const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
