import { For } from "solid-js";
import {
  createSolidTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/solid-table";

export default function Table<T>({
  dataFunction,
  columnData,
}: {
  dataFunction: () => Array<T>;
  columnData: ColumnDef<T>[];
}) {
  const table = createSolidTable({
    columns: columnData,
    getCoreRowModel: getCoreRowModel(),
    get data() {
      return dataFunction();
    },
  });
  return (
    <table>
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
                          header.getContext()
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                          header.getContext()
                        )}
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </tfoot>
    </table>
  );
}
