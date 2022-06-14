import { TestBed } from '@angular/core/testing';

import { WindowEventsService } from './window-events.service';
import { WINDOW_TOKEN } from './window.injectable';

const mockWindow = window

describe('WindowEventsService', () => {
  let service: WindowEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: WINDOW_TOKEN,
        useValue: mockWindow
      }]
    });
    service = TestBed.inject(WindowEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect window resizes', (done)=>{
    service.windowSize$.subscribe(c => { expect(c).not.toBeUndefined(); done() })
    window.resizeBy(1200, 1000)
  })

  it('should reconize each window size category correctly', (done) => {
    service.windowSizes = {
      small: 700,
      medium: 1000,
      large: -1
    }

    const sizes = [700, 1000, 2000]
    let i = 0

    const spy = spyOnProperty(window, 'innerWidth').and.returnValue(sizes[i])
    
    service.windowSize$.subscribe({
      next: c => {
        expect(c).toBe(i)

        if (sizes[++i]) {
          spy.and.returnValue(sizes[i])
          mockWindow.dispatchEvent(new Event('resize'))
        }
        else service.ngOnDestroy()
      },
      complete: done
    })
    
  })
});
