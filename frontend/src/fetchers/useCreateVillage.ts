import { QueryClient, createMutation } from "@tanstack/solid-query"
import { CreateVillageRequest, Village } from "../types/village"
import api from "../utils/api"

export default function useCreateVillage(queryClient: QueryClient) {
    return createMutation(() => ({
        mutationKey: ["createVillage"],
        mutationFn: async (data: CreateVillageRequest): Promise<Village> => {
            return await api.post("/api/villages/", data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["villages"]})
        }
    }))
}