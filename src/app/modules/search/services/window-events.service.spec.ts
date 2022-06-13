import { TestBed } from '@angular/core/testing';

import { WindowEventsService } from './window-events.service';
import { WINDOW_TOKEN } from './window.injectable';

describe('WindowEventsService', () => {
  let service: WindowEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: WINDOW_TOKEN,
        useValue: window
      }]
    });
    service = TestBed.inject(WindowEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
