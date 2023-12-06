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
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CookieIcon, Dice6Icon } from "lucide-react";
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
  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    setThemeValue(session?.theme ?? "light");
  }, [session?.theme]);
  return (
    <Popover>
      <PopoverTrigger className="h-full rounded border border-gray-900 dark:border-gray-100 px-2">
        <SessionUser />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="block h-full flex flex-col items-center justify-end font-mono">
          <form
            id="manage-form"
            className="h-full w-full"
            action={submitSession}
          >
            <section className="form-group border w-full pb-2 pt-1 px-4 flex items-center justify-between gap-2">
              <Label>Session Code</Label>
              <Input
                className="w-[100px]"
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
          </form>
          <form
            id="clear-form"
            action={submitSession}
            className="h-full flex-shrink w-fit"
            onSubmit={(e) => {
              setCookieConsent(false);
            }}
          >
            <input
              form="clear-form"
              type="hidden"
              name="action"
              value="clear"
            />
          </form>
          <div className="border w-full flex gap-2 px-4 py-2 justify-between">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              form="clear-form"
            >
              Clear
            </Button>
            <div>
              <TooltipProvider delayDuration={500}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="cookie-consent">Consent</Label>
                      <Checkbox
                        id="cookie-consent"
                        name="consent"
                        checked={cookieConsent}
                        onClick={() => setCookieConsent(!cookieConsent)}
                      />
                    </div>
                    <Button
                      size="sm"
                      type="submit"
                      form="manage-form"
                      disabled={!cookieConsent}
                    >
                      <CookieIcon className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[42ch]">
                    <p>
                      We will save some data as a cookie on this device if you
                      click <b>Save</b>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SessionUser() {
  const { session } = useContext(SessionContext);
  return <code>{session?.rand || "anon"}</code>;
}
