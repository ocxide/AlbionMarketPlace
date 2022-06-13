import { City } from "./city";
import { ModifiedQuality } from "./modified-quality";

export type ModifiedCity = Omit<City, 'qualities'> & { qualities: ModifiedQuality[] }