import { cx } from "@/utils/cx";

export interface ButtonProps extends JSX.HtmlButtonTag {
  intent?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "xs" | "sm" | "lg" | "icon" | "icon-sm";
  children?: any;
}
export const Button = ({ intent, size, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      class={buttonStyles({ intent, size, class: props.class })}
    >
      {children}
    </button>
  );
};

export const buttonStyles = (props: ButtonProps) => {
  return cx(
    "group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-md font-medium transition-colors first-letter:capitalize focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-border disabled:pointer-events-none disabled:opacity-50",
    props.intent === "primary" &&
      "bg-primary font-semibold text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-offset-1",
    props.intent === "secondary" &&
      "bg-muted/50 font-medium text-accent-foreground hover:bg-muted",
    props.intent === "outline" &&
      "bg-background text-accent-foreground ring-1 ring-inset ring-border hover:bg-muted/50 hover:ring-accent/50",
    props.intent === "ghost" &&
      "bg-transparent text-accent-foreground hover:bg-muted/50",
    props.intent === "destructive" &&
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    props.intent === "link" &&
      "p-0 text-accent-foreground underline-offset-4 hover:underline hover:decoration-primary",
    props.size === "lg" && "h-11 rounded-md px-6",
    props.size === "sm" && "h-8 rounded-md px-3.5 text-sm",
    props.size === "xs" && "h-6 rounded-md px-2.5 text-xs",
    props.size === "icon" && "h-10 w-10 p-0",
    props.size === "icon-sm" && "h-6 w-6 p-0",
    props.class,
  );
};
