import { cx } from "@/utils/cx";
import Table from "../table";
import Dropdown from "../dropdown";
import { Button } from "../button";
import { SearchBar } from "../search-bar";
import { Hover } from "../hover-transition";
import { Action, Column } from "./utils";
import { dict } from "@/utils/dictionary";

export function DataTable<T>({
  children,
  columns,
  search,
}: {
  children: any;
  columns: Column<T>[];
  search?: {
    "hx-get": string;
    id: string;
    name: string;
    placeholder?: string;
    key: string;
  };
}) {
  return (
    <>
      <div class="mb-2 flex gap-1.5 px-px">
        {search ? (
          <SearchBar
            {...search}
            hx-trigger="keyup changed delay:500ms, search"
            hx-target="next tbody"
            hx-swap="innerHTML"
            hx-include="this"
            class="flex-grow"
          />
        ) : null}
        <Button intent="outline" size="icon">
          <i class="i-lucide-sliders" />
        </Button>
        {/* Column Visibility */}
        <Dropdown>
          <Dropdown.Trigger intent="outline" size="icon">
            <i class="i-lucide-table-properties" />
          </Dropdown.Trigger>
          <Dropdown.Content class="w-48">
            <Dropdown.Header class="text-sm font-semibold">
              Columnas
            </Dropdown.Header>
            <Dropdown.Separator />
            <Hover>
              {columns
                .filter((e) => !e.disableHiding)
                .map(({ accessor, header, hidden }) => (
                  <Hover.Item>
                    <Dropdown.Item
                      _={`on click tell #${String(
                        accessor,
                      )} in next <colgroup/> toggle .hidden end
                  on click tell .${String(
                    accessor,
                  )} in next <table/> toggle .hidden end
                    on click toggle .hidden on <i/> in me`}
                      size="sm"
                    >
                      <span> {header ? header : dict.get(accessor)}</span>
                      <i class={cx("i-lucide-check", hidden && "hidden")} />
                    </Dropdown.Item>
                  </Hover.Item>
                ))}
            </Hover>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <Table>
        <colgroup>
          {columns.map(({ col, accessor, hidden }) => (
            <col id={String(accessor)} class={cx(col, hidden && "hidden")} />
          ))}
          <col class={"w-10"} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            {columns.map(({ accessor, header, sortable }) => (
              <Table.HCell
                _={`init if #${String(
                  accessor,
                )} @class contains 'hidden' then add .hidden end`}
                class={cx(String(accessor))}
              >
                {sortable ? (
                  <Button
                    hx-get={search?.["hx-get"]}
                    hx-vals={`{ "orderBy": "${String(
                      accessor,
                    )}", "sort": "asc" }`}
                    hx-target="next tbody"
                    hx-swap="innerHTML"
                    intent="ghost"
                    size="xs"
                    class="-ml-2.5 font-semibold text-accent-foreground hover:text-foreground"
                    _={`on click if @hx-vals contains 'asc' 
                        then set @hx-vals to '{ "orderBy": "${String(
                          accessor,
                        )}", "sort": "desc" }'
                        else set @hx-vals to '{ "orderBy": "${String(
                          accessor,
                        )}", "sort": "asc" }'`}
                  >
                    {header ? header : dict.get(accessor)}
                    <i class="i-lucide-chevrons-up-down" />
                  </Button>
                ) : (
                  <span class="text-accent-foreground">
                    {header ? header : dict.get(accessor)}
                  </span>
                )}
              </Table.HCell>
            ))}
            {/* Extra action column */}
            <Table.HCell class={"actions"}>
              <span class="sr-only">Actions</span>
            </Table.HCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{children}</Table.Body>
      </Table>
    </>
  );
}

export function DataRows<T>({
  data,
  columns,
  actions,
  next,
}: {
  data: T[];
  columns: Column<T>[];
  actions: Action<T>[];
  next?: string;
}) {
  return (
    <>
      {data.map((d) => (
        <Table.Row>
          {columns.map(({ accessor, cell }) => (
            <Table.Cell
              _={`init if #${String(
                accessor,
              )} @class contains 'hidden' then add .hidden end`}
              class={cx(String(accessor))}
            >
              {cell ? cell(d) : d[accessor]}
            </Table.Cell>
          ))}
          <Table.Cell class={"actions"}>
            {actions.length > 0 ? (
              actions.length > 1 ? (
                <Dropdown>
                  <Dropdown.Trigger intent="ghost" size="icon-sm">
                    <i class="i-lucide-more-horizontal" />
                  </Dropdown.Trigger>
                  <Dropdown.Content position="right-top" class="w-32 min-w-fit">
                    {actions.map(
                      (action) =>
                        action(d) && (
                          <Dropdown.Item
                            intent="ghost"
                            size="sm"
                            {...action(d)}
                          />
                        ),
                    )}
                  </Dropdown.Content>
                </Dropdown>
              ) : (
                <Button intent="secondary" size="xs" {...actions[0](d)} />
              )
            ) : null}
          </Table.Cell>
        </Table.Row>
      ))}
      {next ? (
        <Table.Row
          hx-get={next}
          hx-swap="outerHTML"
          hx-target="this"
          hx-trigger="revealed"
        />
      ) : null}
    </>
  );
}
