import { tv } from "tailwind-variants";

export const guestEmailStyles = tv({
  slots: {
    container: "bg-zinc-800 rounded-lg flex-row px-3 py-2 items-center gap-3",
    text: "font-regular text-zinc-300 text-base",
  },
});
