import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
);

export async function ping(): Promise<Object> {
  const res = await supabase.functions.invoke("ping");

  if (res.error) {
    throw new Error(res.error);
  }

  return res.data;
}
