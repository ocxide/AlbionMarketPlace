import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { Item } from '@search/interfaces/item';
import { QualityRequiredCity } from '@search/interfaces/quality-required-city';
import { City } from '@search/interfaces/city';

@Component({
  selector: 'item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', display: 'block' }) ),
      state('closed', style({ height: '0', display: 'none'}) ),
      transition('closed => open', [
        style({display: 'block'}),
        animate('200ms')
      ]),
      transition('* => closed', [ animate('400ms') ])
    ])
  ]
})
export class ItemTableComponent implements OnInit {

  @Input('item') set itemSetter(val: Item) {
    this.itemId = val.item_id
    this.sell = val.sell.map(this.parseCity)
    this.buy = val.buy.map(this.parseCity)
  }

  itemId!: string;
  sell!: QualityRequiredCity[]
  buy!: QualityRequiredCity[]

  @Input()
  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (!this.itemId) throw new TypeError('item Input is required')
  }

  openClose(mode?: boolean) {
    this.collapsed = mode ?? !this.collapsed
  }

  private parseCity(city: City): QualityRequiredCity {
    return {
      ...city,
      qualities: [
        city.qualities[0],
        city.qualities[1],
        city.qualities[2],
        city.qualities[3],
        city.qualities[4],
      ]
    }
  }
}