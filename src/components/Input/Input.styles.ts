import { tv } from "tailwind-variants";

export const inputStyles = tv({
  base: "min-h-16 max-h-16 flex-row items-center gap-2",
  variants: {
    variant: {
      primary: "",
      secondary: "h-14 px-4 rounded-lg border border-zinc-800 bg-zinc-950",
      tertiary: "h-14 px-4 rounded-lg border border-zinc-800 bg-zinc-900",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const fieldStyles = tv({
  base: "flex-1 text-zinc-100 text-lg font-regular",
  variants: {
    variant: {
      primary: "",
      secondary: "",
      tertiary: "",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
