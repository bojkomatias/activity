import { TSchema } from "@sinclair/typebox";
import { t } from "elysia";

/**
 * Used to define the columns on your module component
 * (eg: BusinessTable T will be SelectBusiness)
 * @T Generic type
 */
export type Column<T> = {
  accessor: keyof T /** Accessor for retrieving the data of the cell */;
  header?: JSX.Element /** Custom headers to display, if not default to dict.get(accessor) */;
  cell?: (
    r: T,
  ) => JSX.Element /** Custom cell handler, pass the row and operate. */;
  sortable?: true /** Can I sort this column? */;
  disableHiding?: true /** Can I hide this column? */;
  hidden?: true /** Initial hidden for less important columns */;
  col?: string /** Width of column mostly, tailwindcss class */;
};

/**
 * Used to pass the allowed actions through props only  (injected in component)
 * @T Generic type (equivalent to row.original)
 * Can return false (purged in table) if the action is condition based
 */
export type Action<T> = (r: T) => JSX.HtmlTag | false;

/**
 * Validator and Types for paginated, sorted searchable queries to use.
 * In order to be generic, is a function.
 */
export const querySearchParams = <T extends TSchema>(schema: T) =>
  t.Object({
    page: t.Optional(t.Numeric()),
    search: t.Optional(t.String()),
    orderBy: t.Optional(t.KeyOf(schema)),
    sort: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  });

export type QuerySearchParams<T> = {
  page?: number;
  search?: string;
  orderBy?: keyof T;
  sort?: "asc" | "desc";
};

/**
 * Global size of page ...
 * Won't allow manual selection since it's infinite scroll anyways
 */
export const pageLimit = 15;

/**
 * Useful helper to maintain the query string through searches and orderBys,etc
 * @param baseURL
 * @param query
 * @returns string
 */
export const nextURL = <T>(
  baseURL: string,
  { search, orderBy, sort, page }: QuerySearchParams<T>,
) => {
  // Needs http,... but it's ignored anyways
  const n = new URL("/d/users/q/", "http://localhost:3000");
  if (search) n.searchParams.set("search", search);
  if (orderBy) n.searchParams.set("orderBy", orderBy as string);
  if (sort) n.searchParams.set("sort", sort);
  n.searchParams.set("page", (page ? page + 1 : 1).toString());

  return n.pathname + n.search;
};
