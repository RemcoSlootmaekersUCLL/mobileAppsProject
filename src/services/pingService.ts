import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const { supabaseUrl, supabaseKey } = Constants.expoConfig?.extra ?? {};
const supabase = createClient(supabaseUrl, supabaseKey);

export async function ping(): Promise<Object> {
  const res = await supabase.functions.invoke("ping");

  if (res.error) {
    throw new Error(res.error);
  }

  return res.data;
}
