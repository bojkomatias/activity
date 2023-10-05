import { cx } from "@/utils/cx";

export const Badge = (
  props: JSX.HtmlTag & {
    intent?: "primary" | "destructive";
  },
) => {
  return (
    <span
      class={cx(
        "inline-flex items-center whitespace-nowrap rounded-lg border-border px-2.5 text-xs font-semibold leading-relaxed transition-colors focus:outline-none",
        "bg-muted/60 hover:bg-muted/80",
        props.intent === "primary" &&
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        props.intent === "destructive" &&
          "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        props.class,
      )}
    >
      {props.children}
    </span>
  );
};
