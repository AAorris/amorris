import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Suspense } from "react";
import { SessionFormContainer } from "@/components/session";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Aaron Morris",
  description: "🇨🇦 Software Engineer — Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get("session")?.value;
  const theme = session?.startsWith("0") ? "dark" : "light";
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans ${theme}`}
      >
        <header className="h-12 max-w-[1024px] mx-auto p-0 border-l border-r flex justify-between font-mono">
          <div className="flex flex-grow justify-between">
            <nav className="h-full p-0">
              <a
                href="/"
                className="block h-full border w-fit grid items-center px-4"
              >
                /
              </a>
            </nav>
            <h1 className="h-12 w-max text-xl tracking-tighter grid items-center px-4 font-mono text-foreground/50">
              morris.codes
            </h1>
            <section data-name="auth" className="h-full p-0">
              <Suspense fallback={null}>
                <SessionFormContainer />
              </Suspense>
            </section>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
