import { Component, OnInit, QueryList, ViewChildren, HostListener, Inject } from '@angular/core';

import { MarketService } from 'src/app/modules/search/services/market.service';
import { ItemI } from 'src/app/modules/search/interfaces/item-show-i';
import { ItemTableComponent } from '../item-table/item-table.component';
import { finalize, Observable } from 'rxjs';
import { ItemSearch } from '@search/interfaces/item-search';

import { WINDOW_TOKEN } from '@search/services/window.injectable';

type WindowEvent = Event & { target: Window }

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  
  items$?: Observable<ItemI[]>
  loadingData: boolean = false;
  
  @ViewChildren(ItemTableComponent) itemTableChildren!: QueryList<ItemTableComponent>;

  windowSizes = {
    "sm": 500,
    "md": 900,
    "lg": -1
  }

  windowSize: string = '';

  constructor(
    private marketService: MarketService,
    @Inject(WINDOW_TOKEN) private window: Window
    ) {}

  ngOnInit(): void {
    this.window.dispatchEvent(new Event('resize'))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: WindowEvent): void {
    const currentSize = this.detectWindowSize(event.target.innerWidth);
    if (this.windowSize === currentSize) return 
    
    this.windowSize = currentSize;
    this.itemTableChildren.forEach(itemTable => itemTable.resize(this.windowSize));
  }

  detectWindowSize(windowWidth: number): string {
    const entries = Object.entries(this.windowSizes)
    const [ size ] = entries.find(([key, value]) => windowWidth <= value) || [];
    return size || entries.pop()![0]
  }

  searchItem({ item_id, enchant, tier }: ItemSearch): void {
    this.loadingData = true;
    
    this.items$ =
    this.marketService.getItems(item_id, tier, enchant)
    .pipe(finalize(() => { 
      this.loadingData = false;
      this.itemTableChildren.changes.subscribe(() => this.itemTableChildren.first.openClose(true));
     }))
  }

}
