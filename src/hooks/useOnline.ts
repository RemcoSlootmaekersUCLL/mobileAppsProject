import { useEffect, useState } from "react";
import { ping } from "@/services/pingService";
import { Platform } from "react-native";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

export function useOnline(intervalMs = 10000) {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        await withTimeout(ping(), 2500);
        if (active) setOnline(true);
      } catch {
        if (active) setOnline(false);
      }
    };

    check();
    const id = setInterval(check, intervalMs);

    if (Platform.OS === "web") {
      window.addEventListener("online", check);
      window.addEventListener("offline", () => active && setOnline(false));
    }

    return () => {
      active = false;
      clearInterval(id);
      if (Platform.OS === "web") {
        window.removeEventListener("online", check);
      }
    };
  }, [intervalMs]);

  return online;
}
