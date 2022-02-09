import { Injectable } from '@angular/core';
import itemList from './itemList';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  //itemListObj: { item_id: string, item_name: string }[] = [];
  
  constructor() {
   }

   public search(item_name: string, limit: number): { item_id: string, item_name: string }[] {
    //return itemList.filter(item => item.item_name.includes(item_name));
    let query: typeof itemList = [];
    let lastInd: number = 0;
    for(let i = 1; i <= limit; i++) {
      for(lastInd; lastInd < itemList.length; lastInd++) {
        if (itemList[lastInd].item_name.toLowerCase().includes(item_name.toLowerCase())) { query.push(itemList[lastInd]); lastInd++; break; }
      }
    }
    return query;
   }
}
