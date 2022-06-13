import { ModifiedCity } from "./modified-city"
import { ModifiedQuality } from "./modified-quality"

export type QualityRequiredCity = Omit<ModifiedCity, 'qualities'> & {
    qualities: [
      ModifiedQuality | undefined, 
      ModifiedQuality | undefined, 
      ModifiedQuality | undefined, 
      ModifiedQuality | undefined, 
      ModifiedQuality | undefined
    ]
  }