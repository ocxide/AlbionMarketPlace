import { Inject, Injectable, OnDestroy } from '@angular/core';
import { WindowSizes } from '@search/interfaces/window-sizes';
import { WindowEvent } from '@utils/window-event';
import { debounceTime, fromEvent, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { WINDOW_TOKEN } from './window.injectable';

type windowParams = { [key in keyof typeof WindowSizes]: number }

@Injectable({
  providedIn: 'root'
})
export class WindowEventsService implements OnDestroy {

  private unsuscriber$ = new Subject<void>()
  windowSize$ = new ReplaySubject<WindowSizes>(1)

  windowSizes: windowParams = {
    small: 768,
    medium: 900,
    large: -1
  }

  constructor(@Inject(WINDOW_TOKEN) private window: Window) { 
    fromEvent<WindowEvent>(this.window, 'resize')
    .pipe(
      takeUntil(this.unsuscriber$),
      debounceTime(300)
    )
    .subscribe(e => this.detectWindowSize(e))

    setTimeout(() => this.window.dispatchEvent(new Event('resize')), 10)
  }

  private detectWindowSize(e: WindowEvent) {
    const windowWidth = e.target.innerWidth

    const sizes = Object.entries(this.windowSizes)
    const [keysize] = sizes.find(([key, value]) => value >= windowWidth) || sizes[sizes.length-1]

    const size = WindowSizes[keysize as keyof typeof WindowSizes]
    console.log(windowWidth, size)
    this.windowSize$.next(size)
  }
  
  ngOnDestroy(): void {
    this.unsuscriber$.next()
    this.unsuscriber$.complete()

    this.windowSize$.complete()
  }

}
