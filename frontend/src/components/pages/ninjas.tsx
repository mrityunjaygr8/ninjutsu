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

  function dataFunction() {
    if (ninjas.data !== undefined) {
      return ninjas.data.items;
    } else {
      return [] as Ninja[];
    }
  }

  return (
    <>
      <h1>List Villages</h1>
      <Suspense fallback={"Loading..."}>
        <Table columnData={columnData} dataFunction={dataFunction} />
      </Suspense>
    </>
  );
}
