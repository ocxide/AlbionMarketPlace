import { Component, OnInit, Input } from '@angular/core';
import { ItemI } from 'src/app/interfaces/item-show-i';

@Component({
  selector: 'item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
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

}