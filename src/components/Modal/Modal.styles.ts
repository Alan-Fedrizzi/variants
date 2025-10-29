import { tv } from "tailwind-variants";

export const modalStyles = tv({
  slots: {
    blur: "flex-1",
    overlay: "flex-1 justify-end bg-black/60",
    container:
      "bg-zinc-900 border-t border-zinc-700 px-6 pt-5 pb-10 rounded-t-2xl",
    header: "flex-row justify-between items-center pt-5",
    title: "text-white font-medium text-xl",
    subtitle: "text-zinc-400 font-regular leading-6 my-2",
  },
  variants: {
    variant: {
      default: {},
      success: {
        container: "bg-green-900 border-green-700",
        title: "text-green-100",
      },
      error: {
        container: "bg-red-900 border-red-700",
        title: "text-red-100",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
