import { tv } from "tailwind-variants";

export const appStyles = tv({
  slots: {
    container: "flex-1 bg-background-950",
    innerContainer:
      "font-regular text-typography-200 text-base flex-1 justify-center p-4",
    invite: "text-typography-400 font-regular text-center text-lg mt-3",
    inputContainer:
      "w-full bg-background-900 p-4 rounded-xl my-8 border border-outline-700",
    divider: "border-b border-outline-700 py-3",
    policy: "text-typography-500 font-regular text-center text-base",
    policyHighlight: "text-typography-200 underline",
    calendarContainer: "gap-4 mt-4",
    emailContainer:
      "my-2 flex-wrap gap-2 border-b border-outline-700 py-5 items-start",
    noEmail: "text-typography-500 text-base font-regular",
    emailInput: "gap-4 mt-4",
  },
});
