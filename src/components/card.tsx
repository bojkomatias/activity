import { cx } from "@/utils/cx";

const Card = (props: JSX.HtmlTag) => (
  <div
    {...props}
    class={cx(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
      props.class,
    )}
  >
    {props.children}
  </div>
);

Card.Header = (props: JSX.HtmlTag) => (
  <div {...props} class={cx("flex flex-col p-6", props.class)}>
    {props.children}
  </div>
);

Card.Title = (props: JSX.HtmlTag) => (
  <h2
    {...props}
    class={cx("font-semibold leading-loose tracking-tight", props.class)}
  >
    {props.children}
  </h2>
);

Card.Description = (props: JSX.HtmlTag) => (
  <p
    {...props}
    class={cx("text-sm leading-5 text-muted-foreground", props.class)}
  >
    {props.children}
  </p>
);

Card.Content = (props: JSX.HtmlTag) => (
  <div {...props} class={cx("p-6 pt-0", props.class)}>
    {props.children}
  </div>
);

Card.Footer = (props: JSX.HtmlTag) => (
  <div {...props} class={cx("flex items-center p-6", props.class)}>
    {props.children}
  </div>
);

export default Card;
