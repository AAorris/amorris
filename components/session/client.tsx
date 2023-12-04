"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export function SessionForm(props: {
  initialSessionToken?: string;
  sessionFormAction: (
    value: string | undefined,
    formData: FormData
  ) => Promise<string | undefined>;
}) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [sessionToken, formAction] = useFormState(
    props.sessionFormAction,
    props.initialSessionToken
  );
  useEffect(() => {
    if (!sessionToken) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.requestSubmit();
        }
      }, 500);
    }
  }, [sessionToken]);
  return (
    <div className="block h-full w-[250px] grid items-center justify-end font-mono">
      <form className="h-full" ref={ref} action={formAction}>
        <code>{sessionToken}</code>
        <input
          className="border ml-2 min-w-[40px] h-full"
          type="submit"
          value={sessionToken ? "x" : "+"}
        />
      </form>
    </div>
  );
}
