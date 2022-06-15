import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EreaseFormControlDirective } from '@utils/directives/erease-form-control/erease-form-control.directive';

import { MarketService } from '@search/services/market.service';
import { ItemSearchComponent } from '../item-search/item-search.component';

import { MarketComponent } from './market.component';

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketComponent, ItemSearchComponent ],
      providers: [MarketService],
      imports: [
         HttpClientTestingModule,        
         ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        EreaseFormControlDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
