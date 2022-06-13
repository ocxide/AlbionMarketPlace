import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { City } from '@search/interfaces/city'
import { RawItem } from '../interfaces/item-i';
import { Item } from '@search/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private _http: HttpClient) { }
  
  getItems(item_id: string, tier: string[] = [], enchant: string[] = []) {
    const itemList = this.getItemList(item_id, tier, enchant)

    return this._http.get<RawItem[]>('https://www.albion-online-data.com/api/v2/stats/prices/' + (itemList || item_id) )
    .pipe(
      map(data => this.filterRawEmptyItems(data)),
      map(data => data.map(this.toItem_)),
      map(data => this.reduceItems(data)),
      map(data => this.reduceCitiesPerItem(data)),
    )

  }

  private filterRawEmptyItems(items: RawItem[]) {
    return items.filter(item => (
      item.buy_price_max !== 0 ||
      item.buy_price_min !== 0 ||
      item.sell_price_max !== 0 ||
      item.sell_price_min !== 0
    ))
  }

  private getItemList(item_id: string, tiers: string[] = [], enchants: string[] = []) {
    item_id = item_id.toUpperCase();

    let itemList: string = '';

    tiers.forEach(tier => {
      itemList += tier + item_id;
      if (enchants.length > 0) {
        enchants[ enchants.findIndex(e => e == '@0') ] = '';

        itemList += enchants[0] + ',';
        for (let i = 1; i < enchants.length; i++) 
          itemList += tier + item_id + enchants[i] + ',';
      }

      if (itemList.charAt(-1) !== ',') itemList += ','
    });

    return itemList
  }

  private reduceCitiesPerItem(items: Item[]) {
    for (let i = 0; i < items.length; i++) {
      items[i].buy = this.reduceCities(items[i].buy)
      items[i].sell = this.reduceCities(items[i].sell)
    }
    return items
  }
  

  private reduceItems(items: Item[]) {
    return items.reduce<Item[]>((acc, next) => {
      const i = acc.findIndex(it => it.item_id === next.item_id)
      if (i === -1) acc.push(next)
      else {
        acc[i].buy.push(...next.buy)
        acc[i].sell.push(...next.sell)
      }

      return acc
    }, [])
  }

  private reduceCities(cities: City[]) {
    return cities.reduce<City[]>((acc, next) => {
      const i = acc.findIndex(city => city.city === next.city)
      if (i === -1) acc.push(next)
      else acc[i].qualities.push(...next.qualities)
      return acc
    },[])
  }

  private toItem_(item: RawItem): Item {
    const sell: City = {
      city: item.city,
      qualities: [{
        quality: item.quality,
        amount_price_max: item.sell_price_max,
        amount_price_max_date: item.sell_price_max_date,
        amount_price_min: item.sell_price_min,
        amount_price_min_date: item.sell_price_min_date
      }]
    }

    const buy: City = {
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
