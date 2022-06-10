import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GoldMarketComponent } from './gold-market.component';
import { GoldMarketService } from './services/gold-market.service';

describe('GoldMarketComponent', () => {
  let component: GoldMarketComponent;
  let fixture: ComponentFixture<GoldMarketComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldMarketComponent ],
      providers: [ GoldMarketService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldMarketComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
