import { Paginated } from "../types/paginated";
import type { Village } from "../types/village";

import {createQuery} from "@tanstack/solid-query";
import api from "../utils/api";

import type { State } from "../types/state";
import { Accessor } from "solid-js";

export default function useGetVillages(params: Accessor<State>) {
    return createQuery(() => ({
      queryKey: ["villages", {...params()}],
      queryFn: async (): Promise<Paginated<Village>> => {
        return (await api.get("/api/villages/", {
          params: params()
        })).data;
      },
    }));
  }