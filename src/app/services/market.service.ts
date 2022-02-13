import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { ItemQueryI } from '../interfaces/item-i';
import { ItemI } from '../interfaces/item-show-i';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(
    private _http: HttpClient
  ) { }
  
  private getList(itemQLs: ItemQueryI[]): ItemI[] {
    let itemList: ItemI[] = [];

    itemQLs.forEach(itemQ => {
      let itemIx: number = itemList.findIndex((item: ItemI) => item.item_id == itemQ.item_id);
      if (itemIx === -1) itemIx = itemList.push({item_id: itemQ.item_id, cities:[]}) - 1;

      let cityIx: number =itemList[itemIx].cities.findIndex(city => city.city === itemQ.city);

      if (cityIx === -1) {
        cityIx = itemList[itemIx].cities.push({city: itemQ.city, qualities: []}) - 1;
        for (let i:number = 1; i <= 5; i++) 
          itemList[itemIx].cities[cityIx].qualities.push({
            quality: i,
            sell_price_min: 0,
            sell_price_min_date: "0001-01-01T00:00:00",
            sell_price_max: 0,
            sell_price_max_date: "0001-01-01T00:00:00",
            buy_price_min: 0,
            buy_price_min_date: "0001-01-01T00:00:00",
            buy_price_max: 0,
            buy_price_max_date: "0001-01-01T00:00:00"
          });
      }

      let qualityIx = itemList[itemIx].cities[cityIx].qualities.findIndex(quality => quality.quality === itemQ.quality)

      itemList[itemIx].cities[cityIx].qualities[qualityIx] =
        {
          quality: itemQ.quality, 
          sell_price_min: itemQ.sell_price_min,
          sell_price_min_date: itemQ.sell_price_min_date,
          sell_price_max: itemQ.sell_price_max,
          sell_price_max_date: itemQ.sell_price_max_date,
          buy_price_min: itemQ.buy_price_min,
          buy_price_min_date: itemQ.buy_price_min_date,
          buy_price_max: itemQ.buy_price_max,
          buy_price_max_date: itemQ.buy_price_max_date
        };
    });

    return itemList;
  }

  getItems(item_id: string, tier: string[] = [], enchant: string[] = []): Observable<ItemI[]> {
    item_id = item_id.toUpperCase();

    let itemList: string = '';

    tier.forEach(t => {
      itemList += t + item_id;
      if (enchant.length > 0) {
        enchant[ enchant.findIndex(e => e == '@0') ] = '';

        itemList += enchant[0] + ',';
        for (let i = 1; i < enchant.length; i++) 
          itemList += t + item_id + enchant[i] + ',';
      }
    });



    return this._http.get<ItemQueryI[]>('https://www.albion-online-data.com/api/v2/stats/prices/' + (itemList == '' ? item_id: itemList) )
    .pipe(
      map(data => this.getList(data))
      );
  }
}
