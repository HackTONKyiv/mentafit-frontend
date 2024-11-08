import {useMemo} from "react";
import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = (initDataRaw) => createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_KEY!,
  {
    global: {
      headers: {
        telegram_init_data: initDataRaw || "",
      },
    },
  },
)