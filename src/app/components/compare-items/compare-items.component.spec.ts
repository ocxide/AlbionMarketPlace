import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareItemsComponent } from './compare-items.component';

describe('CompareItemsComponent', () => {
  let component: CompareItemsComponent;
  let fixture: ComponentFixture<CompareItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
