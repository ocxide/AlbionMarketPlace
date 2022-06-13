import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModeTableComponent } from './item-mode-table.component';

describe('ItemModeTableComponentComponent', () => {
  let component: ItemModeTableComponent;
  let fixture: ComponentFixture<ItemModeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemModeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
