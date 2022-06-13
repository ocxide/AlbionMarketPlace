import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { ModifiedCity } from '@search/interfaces/modified-city'
import { ItemQueryI } from '../interfaces/item-i';
import { ItemI } from '../interfaces/item-show-i';
import { ItemMode } from '@search/interfaces/item-mode';
import { Item } from '@search/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(
    private _http: HttpClient
  ) { }
  
  private getItemList(item_id: string, tier: string[] = [], enchant: string[] = []) {
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

    return itemList
  }

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
    const itemList = this.getItemList(item_id, tier, enchant)

    return this._http.get<ItemQueryI[]>('https://www.albion-online-data.com/api/v2/stats/prices/' + (itemList || item_id) )
    .pipe(
      map(data => this.getList(data))
      );
  }

  getItemsMode(item_id: string, tier: string[] = [], enchant: string[] = []) {
    const itemList = this.getItemList(item_id, tier, enchant)

    return this._http.get<ItemQueryI[]>('https://www.albion-online-data.com/api/v2/stats/prices/' + (itemList || item_id) )
    .pipe(
      map(data => data.map(this.toItem_)),
      map(data => this.reduceItems(data))
    )

  }

  private reduceItems(items: Item[]) {
    return items.reduce<Item[]>((acc, next) => {
      const i = acc.findIndex(it => it.item_id === next.item_id)
      if (i === -1) acc.push(next)
      else this.searchModifiedCity(acc[i].buy, next.buy)
      return acc
    }, [])
  }

  private searchItem(items: Item[], itemsToConcat: Item[]) {
    itemsToConcat.forEach(item => {
      const i = items.findIndex(it => it.item_id === it.item_id)
      if (i === -1) items.push(item)
      else this.searchModifiedCity(items[i].buy, item.buy)
    })
  }

  private searchModifiedCity(cities: ModifiedCity[], citiesToContat: ModifiedCity[]) {
    citiesToContat.forEach(city => {
      const i = cities.findIndex(c => c.city === city.city)
      if (i === -1) cities.push(city)
      else cities[i].qualities.concat(city.qualities)
    })
  }

  private toItem_(item: ItemQueryI): Item {
    const sell: ModifiedCity = {
      city: item.city,
      qualities: [{
        quality: item.quality,
        amount_price_max: item.sell_price_max,
        amount_price_max_date: item.sell_price_max_date,
        amount_price_min: item.sell_price_min,
        amount_price_min_date: item.sell_price_min_date
      }]
    }

    const buy: ModifiedCity = {
      city: item.city,
      qualities: [{
        quality: item.quality,
        amount_price_max: item.buy_price_max,
        amount_price_max_date: item.buy_price_max_date,
        amount_price_min: item.buy_price_min,
        amount_price_min_date: item.buy_price_min_date
      }]
    }

    return { item_id: item.item_id, sell: [sell], buy: [buy] }
  }
}
