interface Village {
  name: string;
  id: string;
}

interface CreateVillageRequest {
  name: string;
}

type VillageID = string;

export type { Village, CreateVillageRequest, VillageID };
