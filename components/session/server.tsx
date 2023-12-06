"use server";
import { cookies } from "next/headers";
import { Session } from "./common";

export async function manageSession(
  session: Session | null,
  formData: FormData
): Promise<Session | null> {
  if (formData.get("consent") !== "on") {
    cookies().set(
      "session",
      JSON.stringify({
        consent: null,
      }),
      { expires: Date.now() + 1000 * 60 * 60 * 24 }
    );
    return null;
  }
  const result: Session = {
    theme:
      (formData.get("theme") as string | null) ?? session?.theme ?? "light",
    rand: session?.rand ?? "",
    consent: formData.get("consent") === "on" ? "on" : null,
  };
  if (!result.rand) {
    const digits = 3;
    result.rand = Math.floor(Math.random() * Math.pow(16, digits))
      .toString(16)
      .padStart(digits, "0");
  }
  cookies().set("session", JSON.stringify(result), {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 5,
  });
  return result;
}
