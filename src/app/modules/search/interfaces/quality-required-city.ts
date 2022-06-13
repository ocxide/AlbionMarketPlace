import { City } from "./city"
import { Quality } from "./quality"

export type QualityRequiredCity = Omit<City, 'qualities'> & {
    qualities: [
      Quality | undefined, 
      Quality | undefined, 
      Quality | undefined, 
      Quality | undefined, 
      Quality | undefined
    ]
  }