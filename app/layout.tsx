import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SessionForm, SessionProvider } from "@/components/session/client";
import { getSession } from "@/components/session/common";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aaron Morris",
  description: "🇨🇦 Software Engineer — Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSession();
  const theme = session?.theme ?? "light";
  return (
    <SessionProvider initialValue={session}>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans ${theme}`}
        >
          <header className="h-12 max-w-[1024px] mx-auto p-0 border-l border-r flex justify-between font-mono">
            <div className="flex flex-grow justify-between">
              <nav className="h-full p-0">
                <a
                  href="/"
                  className="block h-full border border-blue-300 rounded w-fit grid items-center px-4"
                >
                  /
                </a>
              </nav>
              <h1 className="h-12 w-max text-xl tracking-tighter grid items-center px-4 font-mono text-foreground/50">
                morris.codes
              </h1>
              <section data-name="auth" className="h-full p-0">
                <SessionForm />
              </section>
            </div>
          </header>
          {children}
          <footer className="max-w-[1024px] mx-auto border h-12 flex items-center pl-4 text-foreground/50 tracking-tighter">
            <p>Follow me:</p>
            <div className="px-2 flex flex-row gap-1 items-center">
              <XLogo />
              <GithubLogo />
            </div>
          </footer>
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}

const GithubLogo = () => (
  <a
    href="https://github.com/aaorris"
    target="blank"
    className="border border-blue-300 rounded w-8 h-8 grid place-items-center"
  >
    <svg aria-label="github" height="19" viewBox="0 0 14 14" width="19">
      <path
        d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
        fill="currentColor"
        fillRule="nonzero"
      ></path>
    </svg>
  </a>
);

const XLogo = () => (
  <a
    href="https://x.com/aaorris"
    target="blank"
    className="border border-blue-300 rounded w-8 h-8 grid place-items-center"
  >
    <svg
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      aria-label=""
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
        fill="currentColor"
      ></path>
    </svg>
  </a>
);
