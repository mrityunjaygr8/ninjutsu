import {
  RiArrowsArrowLeftDoubleFill,
  RiArrowsArrowRightDoubleFill,
} from "solid-icons/ri";
import { Accessor, For, JSX, createEffect, createSignal } from "solid-js";

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

export { CreatePaginationButtons };
export type {
  CreatePaginationButtonsProps,
  CreatePaginationButtonsResponse,
  PaginationButtonData,
};

export default function Pagination({
  onPageChange,
  page,
}: {
  onPageChange: (e: number) => void;
  page: Accessor<CreatePaginationButtonsProps>;
}) {
  const [paginationData, setPaginationData] =
    createSignal<CreatePaginationButtonsResponse>({ items: [] });
  createEffect(() => {
    setPaginationData(
      CreatePaginationButtons({
        page: page().page,
        page_count: page().page_count,
      }),
    );
  });
  return (
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
  );
}
