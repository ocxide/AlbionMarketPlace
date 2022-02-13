import { Component, OnInit, QueryList, ViewChildren, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { MarketService } from 'src/app/services/market.service';
import { ItemI } from 'src/app/interfaces/item-show-i';
import { ItemTableComponent } from '../item-table/item-table.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  items!: Observable<ItemI[]>;

  windowSizes = {
    "sm": 500,
    "md": 900,
    "lg": -1
  }

  windowSize: string = '';

  @ViewChildren(ItemTableComponent) itemTableChildren!: QueryList<ItemTableComponent>;

  chargingData: boolean = false;

  constructor(
    private marketService: MarketService
  ) { 
    
  }

  detectWindowSize(): string {
    return Object.entries(this.windowSizes).find((arr: [string, number]) => {
      if (arr[1] === -1) return true;
      return window.innerWidth <= arr[1];
    })![0];
  }

  ngOnInit(): void {
    this.windowSize = this.detectWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any): void {
    const currentSize:string = this.detectWindowSize();
    if (this.windowSize != currentSize) {
      this.windowSize = currentSize;
      this.itemTableChildren.forEach(itemTable => 
        itemTable.resize(this.windowSize)
      )
    }
  }

  searchItem($event: any): void {
    this.chargingData = true;
    this.items = this.marketService.getItems($event.item_id, $event.tier, $event.enchant);
    this.items.subscribe({
      complete: ()=>{this.chargingData = false;}
    });
  }

  

}
