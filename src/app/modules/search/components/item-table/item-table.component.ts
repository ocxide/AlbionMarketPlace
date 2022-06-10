import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { ItemI } from 'src/app/modules/search/interfaces/item-show-i';

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

  @Input() item: ItemI = {
    item_id: '',
    cities: []
  };

  @Input() currentSize!: string;

  qualityList: number[] = [ 1, 2, 3, 4, 5 ];
  showColList: Map<number, number>[] = [
    new Map<number, number>([ [1, 2], [2, 2], [3, 2], [4, 2], [5, 2] ]),
    new Map<number, number>([ [1, 1], [2, 1], [3, 1], [4, 1], [5, 1] ]),
  ];
  
  groupSize!: number;
  isSmScreen!:boolean;

  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.resize(this.currentSize);
  }

  selectColumn(table:number, quality: number, column:number): void {
      this.showColList[table].set(quality, column);
  }

  isHiddenColumn(table:number, quality: number, column:number): boolean {
    if (!this.isSmScreen) return false;
    return this.showColList[table].get(quality) != column;
  }

  resize(size:string):void {
    switch (size) {
      case 'sm':
      case 'md':
        this.groupSize = 2;
        this.isSmScreen = true;
        break;
      default:
        this.groupSize = 1;
        this.isSmScreen = false;
        break;
    }
  }

  openClose(mode: boolean | null = null) {
    if (mode === null) this.collapsed = !this.collapsed;
    else this.collapsed = mode;
  }

}