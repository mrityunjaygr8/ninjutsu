import { For, Match, Switch } from "solid-js";
import {
  createSolidTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/solid-table";
import { Paginated } from "../../types/paginated";
import { CreateQueryResult } from "@tanstack/solid-query";

export default function Table<T>({
  data,
  columnData,
}: {
  data: CreateQueryResult<Paginated<T>, Error>;
  columnData: ColumnDef<T>[];
}) {
  const table = createSolidTable({
    columns: columnData,
    getCoreRowModel: getCoreRowModel(),
    get data() {
      if (data.data !== undefined) {
        return data.data.items;
      } else {
        return [] as Array<T>;
      }
    },
  });
  return (
    <Switch>
      <Match when={data.data !== undefined && data.isSuccess}>
        <div>
          <table class="daisy-table">
            <thead>
              <For each={table.getHeaderGroups()}>
                {(headerGroup) => (
                  <tr>
                    <For each={headerGroup.headers}>
                      {(header) => (
                        <th>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </thead>
            <tbody>
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <tr>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <td>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
            <tfoot>
              <For each={table.getFooterGroups()}>
                {(footerGroup) => (
                  <tr>
                    <For each={footerGroup.headers}>
                      {(header) => (
                        <th>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext(),
                              )}
                        </th>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tfoot>
          </table>
        </div>
      </Match>
    </Switch>
  );
}
