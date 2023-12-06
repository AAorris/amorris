import { Counter } from "@/components/counters/session-incr";
import { LinkTbd } from "@/components/link-tbd/client";
import { SessionForm } from "@/components/session/client";
import { Aaron, HusbandFather } from "@/components/tiles/image-tiles";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="border max-w-[1024px] mx-auto">
      <div className="border h-12 flex items-center pl-4 text-foreground/50 tracking-tighter">
        <p>Welcome: Hey you, you&apos;re finally awake.</p>
      </div>
      <div className="w-full h-[300px] grid place-items-center px-2 border bg-gradient-to-t from-gray-500/5 to-20% to-transparent">
        <div className="flex flex-col items-center">
          <p className="text-5xl w-max font-black tracking-tighter font-sans">
            Home
          </p>
          <div className="flex flex-row items-center">
            <span className="mr-1">
              Welcome to <code>morris.codes</code>{" "}
            </span>
            <SessionForm />
          </div>
          <Suspense
            fallback={<code style={{ visibility: "hidden" }}>...</code>}
          >
            <div className="flex flex-row gap-2">
              <span>View counter</span>
              <Counter uri="/" />
            </div>
          </Suspense>
        </div>
      </div>
      <div className="border h-12 flex items-center pl-4 text-foreground/50 tracking-tighter">
        <p>About Me...</p>
      </div>
      <div className="w-full h-[300px] grid lg:grid-cols-3 border place-items-center gap-0">
        <Aaron />
        <p className="border-l border-r w-full h-full grid place-items-center text-center tracking-tighter text-lg">
          <span>
            Full-stack engineer <br />
            at{" "}
            <a href="https://vercel.com" className="font-bold tracking-normal">
              ▲Vercel
            </a>
          </span>
        </p>
        <HusbandFather />
      </div>
      <div className="border h-12 flex items-center pl-4 text-foreground/50 tracking-tighter">
        <p>Hobbies (links TBD)</p>
      </div>
      <div className="lg:flex border">
        <div className="flex-1 lg:h-[300px] grid content-center justify-center">
          <p className="text-3xl py-4 tracking-tight">8-ball Pool</p>
          <ol className="py-1">
            <li>
              <LinkTbd>How pool works</LinkTbd>
            </li>
            <li>
              <LinkTbd>Pool physics</LinkTbd>
            </li>
            <li>
              <LinkTbd>Pool strategy</LinkTbd>
            </li>
          </ol>
        </div>
        <div className="flex-1 lg:h-[300px] lg:border-l grid content-center justify-center">
          <p className="text-3xl py-4 tracking-tight">Kendo</p>
          <ol className="py-1">
            <li>
              <LinkTbd>How kendo works</LinkTbd>
            </li>
            <li>
              <LinkTbd>Kendo physics</LinkTbd>
            </li>
            <li>
              <LinkTbd>Thoughts on kendo</LinkTbd>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
