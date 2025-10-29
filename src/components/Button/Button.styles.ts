import { tv } from "tailwind-variants";

// Define slots for wrapper and title
export const buttonStyles = tv({
  slots: {
    wrapper:
      "h-11 flex-row items-center justify-center rounded-lg gap-2 px-2 active:opacity-90",
    title: "text-base font-semibold",
  },
  variants: {
    variant: {
      primary: {
        wrapper: "bg-lime-300",
        title: "text-lime-950",
      },
      secondary: {
        wrapper: "bg-zinc-800",
        title: "text-zinc-200",
      },
    },
    disabled: {
      true: {
        wrapper: "opacity-60",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
/*
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
*/
