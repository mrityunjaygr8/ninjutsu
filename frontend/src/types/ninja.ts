import { Village, VillageID } from "./village";

interface Ninja {
  village: Village;
  id: string;
  name: string;
}
interface CreateNinjaRequest {
  name: string;
  village_id: VillageID | null;
}

type NinjaID = string;

export type { Ninja, CreateNinjaRequest, NinjaID };
