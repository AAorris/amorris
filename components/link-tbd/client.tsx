import { track } from "@vercel/analytics";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function LinkTbd(props: { children: string }) {
  return (
    <Popover>
      <PopoverTrigger
        className="underline underline-offset-3 text-blue-500/90"
        onClick={() => {
          track("link-tbd", {
            sub: props.children,
          });
        }}
      >
        {props.children}
      </PopoverTrigger>
      <PopoverContent>
        <p>
          Thanks for your interest! Sorry, this content hasn&apos;t been created
          yet.
        </p>
      </PopoverContent>
    </Popover>
  );
}
