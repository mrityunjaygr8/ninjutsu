import useGetVillages from "../../fetchers/useGetVillages";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import type { Village } from "../../types/village";
import Table from "../items/table";
import { FaSolidPlus } from "solid-icons/fa";
import guidGenerator from "../../utils/id";
import CreateVillage from "../items/village/create_village";
import useCreateVillage from "../../fetchers/useCreateVillage";
import { useQueryClient } from "@tanstack/solid-query";
import { State } from "../../types/state";
import Pagination, { CreatePaginationButtonsProps } from "../items/pagination";

const CREATE_VILLAGE_MODAL = `modal-${guidGenerator()}`;

export default function Villages() {
  const [params, setParams] = createSignal<State>({
    page: 1,
    page_size: 10,
  });

  const villages = useGetVillages(params);

  const columnData: ColumnDef<Village>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];
  const [pageSignal, setPageSignal] =
    createSignal<CreatePaginationButtonsProps>({ page: 0, page_count: 0 });
  createEffect(() => {
    setPageSignal({
      page: villages.data?.page!,
      page_count: villages.data?.page_count!,
    });
  });

  const queryClient = useQueryClient();
  const createVillageMutation = useCreateVillage(queryClient);

  const [formData, setFormData] = createSignal({
    name: "",
  });

  return (
    <>
      <div class="flex justify-between">
        <h1 class="prose text-2xl font-bold text-gray-300">List Villages</h1>
        <button
          class="daisy-btn daisy-btn-primary daisy-btn-sm rounded-none"
          onClick={() =>
            (
              document.getElementById(CREATE_VILLAGE_MODAL) as HTMLDialogElement
            ).showModal()
          }
        >
          <FaSolidPlus />
          Create Village
        </button>
      </div>
      <Switch>
        <Match when={villages.isLoading}>Loading...</Match>
        <Match when={villages.isError}>Error: {villages.error?.message}</Match>
        <Match when={villages.isSuccess}>
          <Table<Village> columnData={columnData} data={villages} />
          <Pagination
            onPageChange={(e: number) => {
              setParams({ ...params(), page: e });
            }}
            page={pageSignal}
          />
        </Match>
      </Switch>
      <dialog id={CREATE_VILLAGE_MODAL} class="daisy-modal">
        <div class="daisy-modal-box">
          <CreateVillage
            formData={formData()}
            setFormData={setFormData}
            formReset={() =>
              (
                document.getElementById(
                  CREATE_VILLAGE_MODAL,
                ) as HTMLDialogElement
              ).close()
            }
            formSubmit={(e) => {
              e.preventDefault();
              createVillageMutation.mutate(formData());
              (e.target as HTMLFormElement).reset();
              const modal = document.getElementById(
                CREATE_VILLAGE_MODAL,
              ) as HTMLDialogElement;
              modal.close();
            }}
          />
        </div>

        <form method="dialog" class="daisy-modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
