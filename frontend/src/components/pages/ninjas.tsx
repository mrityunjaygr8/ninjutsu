import useGetNinjas from "../../fetchers/useGetNinjas";
import { Suspense } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import type { Ninja } from "../../types/ninja";
import Table from "../items/table";

export default function Villages() {
  const ninjas = useGetNinjas();

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
      accessorKey: "village.id",
      header: "Village",
      cell: (info) => (
        <span>
          <b>{info.getValue()}</b> - {info.row.original.village.name}
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 class="prose text-2xl font-bold text-gray-300 p-4">List Ninjas</h1>
      <Suspense fallback={"Loading..."}>
        <Table<Ninja> columnData={columnData} data={ninjas} />
      </Suspense>
    </>
  );
}
