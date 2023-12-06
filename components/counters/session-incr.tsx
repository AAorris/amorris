"use server";
import { cache } from "react";
import { kv } from "@vercel/kv";
import { unstable_cache, unstable_noStore } from "next/cache";
import { getSession } from "../session/common";

/** App name */
const app = "morris-codes";

const getIncrValue = unstable_cache(
  async (key) => kv.incr(key),
  ["session-incr"],
  {
    revalidate: 1,
  }
);

async function RawCounter(props: { uri: string }) {
  unstable_noStore();
  const session = await getSession();

  // No session consent -> no data
  if (session?.consent !== "on") return <code>(off)</code>;

  const countKey = `${app}-${props.uri}-${process.env.VERCEL_ENV}-${session.rand}`;
  const incr = getIncrValue(countKey);
  kv.expire(countKey, 60 * 60 * 24 * 7);
  const v = await incr;
  return <code>{`${session.rand}:${v ?? "0"}`}</code>;
}

export const Counter = cache(RawCounter);
