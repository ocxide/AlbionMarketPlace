import { Inject, Injectable, OnDestroy } from '@angular/core';
import { WindowSizes } from '@search/interfaces/window-sizes';
import { WindowEvent } from '@utils/window-event';
import { debounceTime, fromEvent, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { WINDOW_TOKEN } from './window.injectable';

type windowParams = { [key in keyof typeof WindowSizes]: number }

const windowSizes: windowParams = {
  small: 768,
  medium: 900,
  large: -1
}

@Injectable({
  providedIn: 'root'
})
export class WindowEventsService implements OnDestroy {

  private unsuscriber$ = new Subject<void>()
  windowSize$ = new ReplaySubject<WindowSizes>(1)

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

    let currentSize: WindowSizes;
    if (windowWidth <= windowSizes.small) currentSize = WindowSizes.small
    else if (windowWidth <= windowSizes.medium) currentSize = WindowSizes.medium
    else currentSize = WindowSizes.large

    this.windowSize$.next(currentSize)
  }
  
  ngOnDestroy(): void {
    this.unsuscriber$.next()
    this.unsuscriber$.complete()

    this.windowSize$.complete()
  }

}
