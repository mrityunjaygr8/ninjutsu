import useGetVillages from "../../fetchers/useGetVillages";
import { Suspense } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import type { Village } from "../../types/village";
import Table from "../items/table";

export default function Villages() {
  const villages = useGetVillages();

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

  function dataFunction() {
    if (villages.data !== undefined) {
      return villages.data.items;
    } else {
      return [] as Village[];
    }
  }

  return (
    <>
      <h1>List Villages</h1>
      <Suspense fallback={"Loading..."}>
        <pre>{JSON.stringify(villages.data, null, 2)}</pre>
        <Table columnData={columnData} dataFunction={dataFunction} />
      </Suspense>
    </>
  );
}
