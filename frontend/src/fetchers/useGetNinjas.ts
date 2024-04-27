import { Paginated } from "../types/paginated";
import API_URL from "../utils/api";
import type { Ninja } from "../types/ninja";

import {createQuery} from "@tanstack/solid-query";

export default function useGetNinjas() {
    return createQuery(() => ({
      queryKey: ["ninjas"],
      queryFn: async (): Promise<Paginated<Ninja>> => {
        const response = await fetch(`${API_URL}/api/nin/`);
        const data = await response.json();
        return data;
      },
    }));
  }