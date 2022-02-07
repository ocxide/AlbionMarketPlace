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
}
