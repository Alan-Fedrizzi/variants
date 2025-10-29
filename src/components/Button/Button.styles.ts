import { tv } from "tailwind-variants";

export const buttonStyle = tv({
  base: "h-11 flex-row items-center justify-center rounded-lg gap-2 px-2",
  variants: {
    variant: {
      primary: "bg-lime-300",
      secondary: "bg-zinc-800",
    },
    disabled: {
      true: "opacity-60",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const titleStyle = tv({
  base: "text-base font-semibold",
  variants: {
    variant: {
      primary: "text-lime-950",
      secondary: "text-zinc-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
