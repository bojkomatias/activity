import { cx } from "@/utils/cx";

const Details = (props: JSX.HtmlTag) => (
  <dl {...props} class={cx("divide-y divide-border", props.class)}>
    {props.children}
  </dl>
);

Details.Detail = (props: JSX.HtmlTag) => (
  <div
    {...props}
    class={cx("p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6", props.class)}
  >
    {props.children}
  </div>
);

Details.Term = (props: JSX.HtmlTag) => (
  <dt {...props} class={cx("text-sm font-medium text-foreground", props.class)}>
    {props.children}
  </dt>
);
Details.Description = (props: JSX.HtmlTag) => (
  <dd
    {...props}
    class={cx(
      "mt-1 flex items-center justify-between text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0",
      props.class,
    )}
  >
    {props.children}
  </dd>
);

export default Details;
