import { Injectable } from '@angular/core';
import itemList1 from './itemList1.json';
import itemList2 from './itemList2.json';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  
  constructor() {
   }

   public search(item_name: string, limit: number): { item_id: string, item_name: string }[] {
    //return itemList.filter(item => item.item_name.includes(item_name));
    let query: typeof itemList1 = [];
    let lastInd: number = 0;
    for(let i = 1; i <= limit; i++) {
      if (lastInd < itemList1.length) for(lastInd; lastInd < itemList1.length; lastInd++) {
        if (itemList1[lastInd].item_name.toLowerCase().includes(item_name.toLowerCase())) { query.push(itemList1[lastInd]); lastInd++; break; }
      }
      
      else for(lastInd; (lastInd - itemList1.length) < itemList2.length; lastInd++) {
      if (itemList2[(lastInd - itemList1.length)].item_name.toLowerCase().includes(item_name.toLowerCase())) { query.push(itemList2[(lastInd - itemList1.length)]); lastInd++; break; }
      }
    }
    return query; 
   }
}
