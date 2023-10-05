import { cx } from "@/utils/cx";

const Table = (props: JSX.HtmlTableTag) => (
  <div
    {...props}
    class={cx(
      "relative flow-root min-h-[50svh] overflow-x-auto pb-20",
      props.class,
    )}
  >
    <table class="min-w-full table-fixed">{props.children}</table>
  </div>
);

Table.Head = (props: JSX.HtmlTableSectionTag) => (
  <thead
    {...props}
    class={cx(
      "relative after:absolute after:inset-x-px after:inset-y-1 after:-z-10 after:rounded-lg after:bg-muted/50 after:ring-1 after:ring-border",
      props.class,
    )}
  >
    {props.children}
  </thead>
);

Table.Body = (props: JSX.HtmlTableSectionTag) => (
  <tbody {...props} class={cx("divide-y divide-border", props.class)}>
    {props.children}
  </tbody>
);

Table.Row = (props: JSX.HtmlTableRowTag) => (
  <tr {...props} class={cx("w-full", props.class)}>
    {props.children}
  </tr>
);

Table.HCell = (props: JSX.HtmlTableHeaderCellTag) => (
  <th
    {...props}
    class={cx(
      "table-cell px-3 py-3 text-left text-xs font-semibold last:text-right sm:first:pl-6 sm:last:pr-6",
      props.class,
    )}
  >
    {props.children}
  </th>
);

Table.Cell = (props: JSX.HtmlTableHeaderCellTag) => (
  <td
    {...props}
    class={cx(
      "table-cell whitespace-nowrap px-3 py-3 text-sm text-accent-foreground first-of-type:pl-6 first-of-type:font-medium first-of-type:text-foreground last-of-type:text-right",
      props.class,
    )}
  >
    {props.children}
  </td>
);

Table.Footer = (props: JSX.HtmlTableSectionTag) => (
  <tfoot
    {...props}
    class={cx(
      "relative after:absolute after:inset-x-px after:inset-y-1 after:-z-10 after:rounded-lg after:bg-muted/50 after:ring-1 after:ring-border",
      props.class,
    )}
  >
    {props.children}
  </tfoot>
);

export default Table;
