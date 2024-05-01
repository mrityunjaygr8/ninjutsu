import { Paginated } from "../types/paginated";
import type { Ninja } from "../types/ninja";

import { createQuery } from "@tanstack/solid-query";
import api from "../utils/api";
import { Accessor } from "solid-js";
import type { State } from "../types/state";

export default function useGetNinjas(params: Accessor<State>) {
  return createQuery(() => ({
    queryKey: ["ninjas", params],
    queryFn: async (): Promise<Paginated<Ninja>> => {
      return (await api.get("/api/nin/", { params: params() })).data;
    },
  }));
}
