import { cx } from "@/utils/cx";

interface Props extends JSX.HtmlButtonTag {
  intent?: "primary" | "secondary" | "destructive";
  size?: "xs" | "sm";
  children?: any;
}
export const Button = ({
  intent,
  size,
  loading,
  children,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      class={buttonStyles({ intent, size, class: props.class })}
    >
      {children}
    </button>
  );
};

export const buttonStyles = (props: {
  intent?: "primary" | "secondary" | "destructive";
  size?: "xs" | "sm";
  class?: string;
}) => {
  return cx(
    "group flex w-fit items-center justify-center gap-1 rounded px-3.5 py-2 text-sm font-semibold hover:bg-gray-100 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50 dark:hover:bg-gray-900",
    props.intent === "primary" &&
      "bg-gray-900 text-white hover:bg-black dark:bg-gray-200 dark:text-black dark:hover:bg-white",
    props.intent === "secondary" &&
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-850",
    props.intent === "destructive" &&
      "bg-red-600 text-white saturate-[85%] hover:bg-red-600 hover:saturate-100 dark:hover:bg-red-600",
    props.size === "xs" && "px-2 py-1 text-xs",
    props.size === "sm" && "px-2.5 py-1.5 text-xs",
    props.class,
  );
};
