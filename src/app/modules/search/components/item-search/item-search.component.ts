import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ItemListService } from 'src/app/modules/search/services/item-list.service';
import { Observable, debounceTime, startWith, map } from 'rxjs';

import { ItemSearch } from '@search/interfaces/item-search';

interface RawItemSearch {
  item_name: string,
  item_id: string
}

@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  private fb = new FormBuilder().nonNullable

  tierList: string[] = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
  enchantList: string[] = ['@0', '@1', '@2', '@3'];

  searchItemForm = this.fb.group({
    item_id: this.fb.control('', Validators.required),
    tier: this.fb.control<string[]>([], Validators.required),
    enchant: this.fb.control<string[]>([], Validators.required)
  })

  itemNameInput = this.fb.control('', Validators.required)

  filItems: Observable<RawItemSearch[]>;

  @Output('itemSubmit') 
  itemEmitter = new EventEmitter<ItemSearch>();

  constructor(private itemLsSer: ItemListService) {
      this.filItems = this.itemNameInput.valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map(itemName => this.itemLsSer.search(itemName, 20) )
      );
   }

  ngOnInit(): void {
  }

  sendItem() {
    if (this.searchItemForm.invalid) return; 
    /* Validating the data, so searchItemForm value will never be incorrect */
    this.itemEmitter.emit(this.searchItemForm.value as any);
  }

  selectItemByHtmlElement(element: HTMLElement) {
    const item_id = element.getAttribute('item_id')

    if (!item_id) throw new Error('Html element does not have item_id')
    return this.selectItem(item_id)
  }

  private selectItem(item_id: string): void {
    const { item_enchant, item_name, item_tier } = this.itemLsSer.selectItem(item_id);

    if (item_tier) this.searchItemForm.controls.tier.enable()
    else this.searchItemForm.controls.tier.disable()

    if (item_enchant) this.searchItemForm.controls.enchant.enable()
    else this.searchItemForm.controls.enchant.disable()

    this.searchItemForm.controls.item_id.setValue(item_name);
    this.searchItemForm.controls.tier.setValue([item_tier]);
    this.searchItemForm.controls.enchant.setValue([item_enchant]);
  }

}
