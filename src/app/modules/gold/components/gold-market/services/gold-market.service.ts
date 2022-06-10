import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

interface DataPoint {
    price: number,
    timestamp: string 
  }
  

@Injectable({
    providedIn: 'root'
})
export class GoldMarketService {
    URL = "https://www.albion-online-data.com/api/v2"
    
    constructor(
        private http: HttpClient
    ) {}

    getGoldPrices(start: string, end: string) {
        const startDate = new Date(start)
        const endDate = new Date(end)

        return (
            this.http.get<DataPoint[]>(`${this.URL}/stats/gold?date=${startDate.toJSON()}&end_date=${endDate.toJSON()}`)
            .pipe(map(values => 
                values.map(value => ({...value, timestamp: new Date(value.timestamp).getTime() }))
            ))
        )
    }
}