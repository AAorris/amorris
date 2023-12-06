import { cookies } from "next/headers";

export type Session = { rand: string; theme: string };

export function getSession() {
  const value = cookies().get("session")?.value;
  if (!value) return null;
  return JSON.parse(value) as Session;
}
