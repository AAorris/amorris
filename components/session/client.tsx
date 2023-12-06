"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { manageSession } from "./server";
import { Session } from "./common";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";

export const SessionContext = createContext<{
  session: Session | null;
  submitSession?: (formData: FormData) => Promise<string | undefined>;
}>({
  session: null,
});

export const SessionProvider = (props: {
  children: React.ReactNode;
  initialValue: Session | null;
}) => {
  const [session, submitSession] = useFormState(
    manageSession,
    props.initialValue
  );
  return (
    <SessionContext.Provider
      value={{
        session,
        submitSession: submitSession as unknown as (
          formData: FormData
        ) => Promise<string | undefined>,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export function SessionForm() {
  const { session, submitSession } = useContext(SessionContext);
  const [themeValue, setThemeValue] = useState(session?.theme ?? "light");
  const [cookieConsent, setCookieConsent] = useState(true);
  useEffect(() => {
    setThemeValue(session?.theme ?? "light");
  }, [session?.theme]);
  useEffect(() => {
    if (session?.consent !== "on") {
      setCookieConsent(false);
    }
  }, [session?.consent]);
  return (
    <Popover>
      <PopoverTrigger className="h-full rounded border border-gray-900 dark:border-gray-100 px-2">
        <SessionUser />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <form className="h-full w-full" action={submitSession}>
          <div className="block h-full flex flex-col items-center justify-end font-mono">
            <section className="form-group border w-full pb-2 pt-1 px-4 flex items-center justify-between gap-2">
              <Label>Session Code</Label>
              <Input
                className="text-right w-[7ch] text-sm py-0 h-[2em]"
                type="text"
                value={session?.rand || "anon"}
                disabled
              />
            </section>
            <section className="form-group border w-full py-2 px-4 flex items-center justify-between">
              <Label>Theme</Label>
              <RadioGroup
                defaultValue={themeValue}
                name="theme"
                className="flex items-center space-x-2"
                disabled={!cookieConsent}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light-theme" />
                  <Label htmlFor="light-theme">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark-theme" />
                  <Label htmlFor="dark-theme">Dark</Label>
                </div>
              </RadioGroup>
            </section>
            <div className="border w-full flex gap-2 px-4 py-2 justify-between">
              <div className="flex items-center gap-1">
                <Label htmlFor="cookie-consent">Consent</Label>
                <Checkbox
                  id="cookie-consent"
                  name="consent"
                  checked={cookieConsent}
                  onClick={() => setCookieConsent(!cookieConsent)}
                />
              </div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Button
                      size="sm"
                      type="submit"
                      variant={cookieConsent ? "default" : "destructive"}
                    >
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[42ch]">
                    {cookieConsent ? (
                      <p>
                        We will save some data on this device to remember your
                        choices.
                      </p>
                    ) : (
                      <p>
                        We will opt you out of any features related to saving
                        data on this device and clear anything you stored
                        earlier.
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export function SessionUser() {
  const { session } = useContext(SessionContext);
  return <code>{session?.rand || "anon"}</code>;
}
