"use server";
import { cookies } from "next/headers";
import { SessionForm } from "./client";

export async function sessionFormAction(token: string | undefined) {
  const action =
    typeof token === "string" || cookies().get("session") ? "delete" : "create";

  if (action === "create") {
    const session = Math.floor(Math.random() * Math.pow(16, 2))
      .toString(16)
      .padStart(2, "0");

    const token = `${session}`;
    cookies().set("session", token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 5,
    });
    return token;
  } else {
    cookies().delete("session");
    return undefined;
  }
}

export async function SessionFormContainer() {
  const sessionToken = cookies().get("session");
  return (
    <SessionForm
      sessionFormAction={sessionFormAction}
      initialSessionToken={sessionToken?.value}
    />
  );
}

export async function SessionUser() {
  const user = cookies().get("session")?.value;
  return <code>{user || "visitor"}</code>;
}
