import { Paginated } from "../types/paginated";
import type { Ninja } from "../types/ninja";

import {createQuery} from "@tanstack/solid-query";
import api from "../utils/api";

export default function useGetNinjas() {
    return createQuery(() => ({
      queryKey: ["ninjas"],
      queryFn: async (): Promise<Paginated<Ninja>> => {
        return (await api.get("/api/nin/")).data
      },
    }));
  }