import {
  Accessor,
  For,
  JSX,
  Match,
  Switch,
  createEffect,
  createSignal,
} from "solid-js";
import {
  createSolidTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/solid-table";
import { Paginated } from "../../types/paginated";
import {
  RiArrowsArrowLeftDoubleFill,
  RiArrowsArrowRightDoubleFill,
} from "solid-icons/ri";
import { CreateQueryResult } from "@tanstack/solid-query";

const VISIBLE_EXTRA_PAGES = 2;

interface CreatePaginationButtonsProps {
  page: number;
  page_count: number;
}

interface CreatePaginationButtonsResponse {
  items: Array<PaginationButtonData>;
}

interface PaginationButtonData {
  label: JSX.Element;
  linkValue: number;
  active: boolean;
  disabled: boolean;
}

const CreatePaginationButtons = ({
  page,
  page_count,
}: CreatePaginationButtonsProps): CreatePaginationButtonsResponse => {
  let response: CreatePaginationButtonsResponse = { items: [] };

  const first: PaginationButtonData = {
    active: false,
    label: (
      <>
        <RiArrowsArrowLeftDoubleFill /> First
      </>
    ),
    linkValue: 1,
    disabled: page === 1,
  };
  const last: PaginationButtonData = {
    label: (
      <>
        Last <RiArrowsArrowRightDoubleFill />
      </>
    ),
    active: false,
    linkValue: page_count,
    disabled: page === page_count,
  };
  response.items.push(first);
  let preStart = page - VISIBLE_EXTRA_PAGES;
  let preEnd = page;
  let postStart = page + 1;
  let postEnd = page + VISIBLE_EXTRA_PAGES;
  if (page <= VISIBLE_EXTRA_PAGES) {
    preStart = 1;
  }
  if (page + VISIBLE_EXTRA_PAGES > page_count) {
    postEnd = page_count;
  }
  for (let i = preStart; i < preEnd; i++) {
    response.items.push({
      active: false,
      disabled: false,
      linkValue: i,
      label: i,
    });
  }

  response.items.push({
    active: true,
    disabled: false,
    linkValue: page,
    label: page,
  });

  for (let i = postStart; i <= postEnd; i++) {
    response.items.push({
      active: false,
      disabled: false,
      linkValue: i,
      label: i,
    });
  }

  response.items.push(last);
  return response;
};

export default function Table<T>({
  data,
  columnData,
  onPageChange,
}: {
  data: CreateQueryResult<Paginated<T>, Error>;
  columnData: ColumnDef<T>[];
  onPageChange: (e: number) => void;
}) {
  const [paginationData, setPaginationData] =
    createSignal<CreatePaginationButtonsResponse>({ items: [] });
  createEffect(() => {
    setPaginationData(
      CreatePaginationButtons({
        page: data.data?.page!,
        page_count: data.data?.page_count!,
      })
    );
  });

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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
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
          {/* For Pagination */}
          <div class="daisy-join">
            <For each={paginationData().items}>
              {(item: PaginationButtonData, i: Accessor<number>) => {
                return (
                  <button
                    class="daisy=join-item daisy-btn "
                    classList={{
                      "daisy-btn-active": item.active,
                      "rounded-r-sm": i() === 0,
                      "rounded-l-sm": i() === paginationData().items.length - 1,
                      "rounded-none": !(
                        i() === 0 || i() === paginationData().items.length - 1
                      ),
                    }}
                    onClick={() => onPageChange(item.linkValue)}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </button>
                );
              }}
            </For>
          </div>
        </div>
      </Match>
    </Switch>
  );
}
