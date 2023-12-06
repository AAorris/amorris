"use server";
import { kv } from "@vercel/kv";

export async function Counter(props: { uri: string }) {
  const count = await kv.incr(
    `morris-codes-${props.uri}-${process.env.VERCEL_ENV}`
  );
  return <code>{count ?? "0"}</code>;
}
