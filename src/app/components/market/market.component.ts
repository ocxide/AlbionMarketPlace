import { Component, OnInit, QueryList, ViewChildren, HostListener } from '@angular/core';

import { MarketService } from 'src/app/services/market.service';
import { ItemQueryI } from 'src/app/interfaces/item-i';
import { ItemI } from 'src/app/interfaces/item-show-i';
import { ItemTableComponent } from '../item-table/item-table.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  itemList: ItemI[] = [];
  itemShowI: ItemQueryI[] = [];

  windowSizes = {
    "sm": 500,
    "md": 900,
    "lg": -1
  }

  windowSize: string = '';

  @ViewChildren(ItemTableComponent) itemTableChildren!: QueryList<ItemTableComponent>;

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

    //this.searchItem();
    //this._searchItem('BAG', [4, 5]);
    
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
    this.itemList = [];
    this.marketService.getItems($event.item_id, $event.tier, $event.enchant)
    .subscribe(data => data.forEach(item => this.insertItem(item)));
  }

  _searchItem(str: string, int: number[]): void {
    this.marketService.getItem(str, int).subscribe(data => {
      data.forEach((itemQ: ItemQueryI) => {
        this.insertItem(itemQ);
      });
    });
  }

  private insertItem(itemQ: ItemQueryI) {
    let itemIx: number = this.itemList.findIndex((item: ItemI) => item.item_id == itemQ.item_id);

    if (itemIx === -1) itemIx = this.itemList.push({item_id: itemQ.item_id, cities:[]}) - 1;

    let cityIx: number = this.itemList[itemIx].cities.findIndex(city => city.city === itemQ.city);

    if (cityIx === -1) {
      cityIx = this.itemList[itemIx].cities.push({city: itemQ.city, qualities: []}) - 1;
      for (let i:number = 1; i <= 5; i++) 
        this.itemList[itemIx].cities[cityIx].qualities.push({
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

    let qualityIx = this.itemList[itemIx].cities[cityIx].qualities.findIndex(quality => quality.quality === itemQ.quality)

    this.itemList[itemIx].cities[cityIx].qualities[qualityIx] =
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
  }

}
