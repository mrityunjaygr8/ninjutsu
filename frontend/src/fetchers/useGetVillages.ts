import { Paginated } from "../types/paginated";
import API_URL from "../utils/api";
import type { Village } from "../types/village";

import {createQuery} from "@tanstack/solid-query";

export default function useGetVillages() {
    return createQuery(() => ({
      queryKey: ["villages"],
      queryFn: async (): Promise<Paginated<Village>> => {
        const response = await fetch(`${API_URL}/api/villages/`);
        const data = await response.json();
        return data;
      },
    }));
  }