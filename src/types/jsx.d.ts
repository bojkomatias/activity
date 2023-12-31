/// <reference types="@kitajs/html/htmx.d.ts" />

type Schema = import("../index").App["schema"];

type PostRoutes = RoutesByType<Schema, "post">;
type GetRoutes = RoutesByType<Schema, "get">;
type PutRoutes = RoutesByType<Schema, "put">;
type DeleteRoutes = RoutesByType<Schema, "delete">;
type PatchRoutes = RoutesByType<Schema, "patch">;

declare namespace JSX {
  interface HtmlTag {
    // Get without starts with api, because it can be used as href
    ["hx-get"]?: GetRoutes;
    ["hx-post"]?: PostRoutes;
    ["hx-put"]?: PutRoutes;
    ["hx-delete"]?: DeleteRoutes;
    ["hx-patch"]?: PatchRoutes;
    // Hyperscript tag to insert JS
    ["_"]?: string;
    /**
     * Preload extension attribute.
     * string indicates a strategy ('mousedown','mouseover')
     * default (true) is 'mousedown'
     */
    ["preload"]?: true | string;
  }
}

type RoutesByType<
  Schema extends Record<string, any>, // Ensure keys are strings
  Type extends "get" | "post" | "put" | "delete" | "patch",
> = RouterPattern<
  RemoveSlash<
    string &
      keyof {
        // Constrain to strings here
        [key in keyof Schema as Schema[key] extends { [key in Type]: unknown }
          ? key
          : never]: true;
      }
  >
>;

type RemoveSlash<S extends string> = S extends `${infer T}/`
  ? T extends ""
    ? S
    : T
  : S;

type RouterPattern<T extends string> =
  T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? `${Start}${string}/${RouterPattern<Rest>}`
    : T extends `${infer Start}:${infer Param}`
    ? `${Start}${string}`
    : T extends `${infer Start}*`
    ? `${Start}${string}`
    : T;
