import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ItemListService } from 'src/app/modules/search/services/item-list.service';
import { Observable, debounceTime, startWith, map } from 'rxjs';

@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @Input() isMultiple!: boolean;

  tierList: string[] = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
  enchantList: string[] = ['@0', '@1', '@2', '@3'];

  searchItemForm: FormGroup = new FormGroup(
    {
      tier: new FormControl('', Validators.required),
      item_id: new FormControl('', Validators.required),
      enchant: new FormControl('', Validators.required)
    }
  );
  itemNameInput: FormControl = new FormControl('');

  filItems!: Observable<{ item_id: string, item_name: string }[]>;
  
  @Output('itemSubmit') 
  itemEmitter: EventEmitter<{ item_name: string, tier: string[], enchant: string[]}> 
  = new EventEmitter<{ item_name: string, tier: string[], enchant: string[]}>();

  constructor(private itemListService: ItemListService) { }

  ngOnInit(): void {
    this.filItems = this.itemNameInput.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      map(itemName => this.itemListService.search(itemName, 20) )
    );
  }

  sendItem() {
    if (!this.searchItemForm.valid) return;
    this.itemEmitter.emit(this.searchItemForm.value);
  }

  selectItem(item_id: string): void {
    let item_tier: string = '';
    let item_name: string = item_id;
    let item_enchant: string = '';

    if (item_id.charAt(0) == 'T' && Number(item_id.charAt(1)) != NaN) {
      this.searchItemForm.controls['tier'].enable();
      item_tier = item_id.slice(0, 2);
      item_name = item_id.slice(2);
    } else this.searchItemForm.controls['tier'].disable();

    if (item_name.slice(-2)[0] == '@' && Number(item_name.slice(-1)) != NaN) {
      this.searchItemForm.controls['enchant'].enable();
      item_enchant = item_name.slice(-2);
      item_name = item_name.slice(0, -2);
    } else this.searchItemForm.controls['enchant'].disable();

    this.searchItemForm.controls['item_id'].setValue(item_name);
    this.searchItemForm.controls['tier'].setValue([item_tier]);
    this.searchItemForm.controls['enchant'].setValue([item_enchant]);
  }

}
