import { tv } from "tailwind-variants";

export const appStyles = tv({
  slots: {
    container: "flex-1 bg-zinc-950",
    innerContainer:
      "font-regular text-zinc-300 text-base flex-1 justify-center p-4",
    invite: "text-zinc-400 font-regular text-center text-lg mt-3",
    inputContainer:
      "w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800",
    divider: "border-b py-3 border-zinc-800",
    policy: "text-zinc-500 font-regular text-center text-base",
    policyHighlight: "text-zinc-300 underline",
    calendarContainer: "gap-4 mt-4",
    emailContainer:
      "my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start",
    noEmail: "text-zinc-600 text-base font-regular",
    emailInput: "gap-4 mt-4",
  },
});
