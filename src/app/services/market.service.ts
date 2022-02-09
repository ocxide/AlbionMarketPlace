import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { ItemQueryI } from '../interfaces/item-i';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(
    private _http: HttpClient
  ) { }

  getItem(item_id: string, categories: number[]): Observable<ItemQueryI[]> {
    item_id = item_id.toUpperCase();
    let itemList:string = '';
    categories.forEach(categ => {
      itemList += 'T' + categ + '_' + item_id + ',';
    });

    console.log(itemList);

    return this._http.get<ItemQueryI[]>('https://www.albion-online-data.com/api/v2/stats/prices/'+itemList);
  }

  getItems(item_id: string, tier: string[] = [], enchant: string[] = []): Observable<ItemQueryI[]> {
    item_id = item_id.toUpperCase();

    let itemList: string = '';

    tier.forEach(t => {
      itemList += t + item_id;
      if (enchant.length > 0) {
        itemList += enchant[0] + ',';
        for (let i = 1; i < enchant.length; i++) 
          itemList += t + item_id + enchant[i] + ',';
      }
    });

    console.log(itemList);
    return this._http.get<ItemQueryI[]>('https://www.albion-online-data.com/api/v2/stats/prices/' + (itemList == '' ? item_id: itemList) );
  }
}
