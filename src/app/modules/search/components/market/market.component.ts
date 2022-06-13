import { Component, OnInit, QueryList, ViewChildren, HostListener, Inject } from '@angular/core';

import { MarketService } from 'src/app/modules/search/services/market.service';
import { ItemI } from 'src/app/modules/search/interfaces/item-show-i';
import { ItemTableComponent } from '../item-table/item-table.component';
import { finalize, Observable, tap } from 'rxjs';
import { ItemSearch } from '@search/interfaces/item-search';

import { WINDOW_TOKEN } from '@search/services/window.injectable';
import { Item } from '@search/interfaces/item';

type WindowEvent = Event & { target: Window }

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  
  items$?: Observable<Item[]>
  loadingData: boolean = false;

  constructor(
    private marketService: MarketService,
    @Inject(WINDOW_TOKEN) private window: Window
    ) {}

  ngOnInit(): void {
  }

  searchItem({ item_id, enchant, tier }: ItemSearch): void {
    this.loadingData = true;
    
    this.items$ =
    this.marketService.getItemsMode(item_id, tier, enchant)
    .pipe(tap(console.log), finalize(() => { 
      this.loadingData = false;
     }))
  }

}
