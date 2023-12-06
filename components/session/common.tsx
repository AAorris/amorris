import { cookies } from "next/headers";

export type Session = { rand?: string; theme?: string; consent?: "on" | null };

export function getSession() {
  const value = cookies().get("session")?.value;
  if (!value) return null;
  return JSON.parse(value) as Session;
}
