import useGetNinjas from "../../fetchers/useGetNinjas";
import useCreateNinja from "../../fetchers/useCreateNinja";
import { JSXElement, Suspense, createSignal } from "solid-js";
import { CellContext, ColumnDef } from "@tanstack/solid-table";
import type { CreateNinjaRequest, Ninja } from "../../types/ninja";
import Table from "../items/table";
import { FaSolidPlus } from "solid-icons/fa";
import guidGenerator from "../../utils/id";
import CreateNinja from "../items/ninja/create_ninja";
import { useQueryClient } from "@tanstack/solid-query";

export default function Villages() {
  const CREATE_NINJA_MODAL = `ninja-modal-${guidGenerator()}`;
  const ninjas = useGetNinjas();

  const [formData, setFormData] = createSignal<CreateNinjaRequest>({
    name: "",
    village_id: null,
  });
  const columnData: ColumnDef<Ninja>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "village",
      header: "Village",
      cell: (info: CellContext<Ninja, unknown>): JSXElement => {
        if (info.row.original.village === null) {
          return <span>Unaffiliated</span>;
        } else {
          return (
            <div
              class="daisy-tooltip"
              data-tip={`Village ID: ${info.row.original.village.id}`}
            >
              {info.row.original.village.name}
            </div>
          );
        }
      },
    },
  ];
  const queryClient = useQueryClient();
  const createNinjaMutation = useCreateNinja(queryClient);

  return (
    <>
      <div class="flex justify-between">
        <h1 class="prose text-2xl font-bold text-gray-300 p-4">List Ninjas</h1>
        <button
          class="daisy-btn daisy-btn-primary daisy-btn-sm rounded-none"
          onClick={() =>
            (
              document.getElementById(CREATE_NINJA_MODAL) as HTMLDialogElement
            ).showModal()
          }
        >
          <FaSolidPlus />
          Create Ninja
        </button>
      </div>
      <Suspense fallback={"Loading..."}>
        <Table<Ninja> columnData={columnData} data={ninjas} />
      </Suspense>
      <dialog id={CREATE_NINJA_MODAL} class="daisy-modal">
        <div class="daisy-modal-box">
          <CreateNinja
            formData={formData()}
            setFormData={setFormData}
            formReset={() =>
              (
                document.getElementById(CREATE_NINJA_MODAL) as HTMLDialogElement
              ).close()
            }
            formSubmit={(e) => {
              e.preventDefault();
              createNinjaMutation.mutate(formData());
              (e.target as HTMLFormElement).reset();
              const modal = document.getElementById(
                CREATE_NINJA_MODAL,
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
