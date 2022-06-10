import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MarketService } from './market.service';

describe('MarketService', () => {
  let service: MarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
