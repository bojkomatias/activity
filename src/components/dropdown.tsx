import { cx } from "@/utils/cx";
import { Button, ButtonProps, buttonStyles } from "./button";

type Props = JSX.HtmlTag;

const Dropdown = (props: Props) => (
  <div {...props} class={cx("relative inline-block text-left", props.class)}>
    {props.children}
  </div>
);

Dropdown.Trigger = (props: ButtonProps) => (
  <Button
    {...props}
    _="on click halt bubbling end
    on click send toggle to next .dropdown end"
  >
    {props.children}
  </Button>
);

Dropdown.Content = ({
  position = "top-right",
  ...props
}: Props & {
  position?: "top-left" | "top-right" | "right-top";
}) => (
  <div
    {...props}
    class={cx(
      "dropdown absolute z-10 w-64 rounded-xl bg-card p-2 shadow ring-1 ring-border",
      "-translate-y-1 scale-95 opacity-0 transition ease-out",
      position === "top-left" && "left-0 mt-1 origin-top-left",
      position === "top-right" && "right-0 mt-1 origin-top-right",
      position === "right-top" && "right-full top-0 mr-1 origin-top-right",
      props.class,
    )}
    _="on click halt bubbling end
    on toggle if @class contains 'dropdown-visible' send close to me else send open to me end
    on open take .dropdown-visible wait then remove .opacity-0 .scale-95 .-translate-y-1 end
    on close add .opacity-0 .scale-95 .-translate-y-1 wait 0.05s then remove .dropdown-visible end"
  >
    {props.children}
  </div>
);

Dropdown.Header = (props: Props) => (
  <div {...props} class={cx("px-3 py-2", props.class)}>
    {props.children}
  </div>
);

Dropdown.Item = ({
  as: Component = "button",
  ...props
}: ButtonProps & { as?: "button" | "a"; href?: string }) => (
  <Component
    _="on click send close to closest .dropdown"
    {...props}
    class={buttonStyles({
      class: cx(
        "w-full justify-between font-normal text-accent-foreground hover:text-foreground",
        props.class,
      ),
      intent: props.intent,
      size: props.size,
    })}
  >
    {props.children}
  </Component>
);

Dropdown.Separator = () => <div class="my-1 h-0 border-t border-border" />;

export default Dropdown;
