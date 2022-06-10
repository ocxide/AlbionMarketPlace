import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';

import { Value } from '@gold/interfaces/value';
import { Point } from '@gold/interfaces/point';

import { LabelAndPointsService } from './services/label-and-points.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-label-and-points',
  templateUrl: './label-and-points.component.html',
  styleUrls: ['./label-and-points.component.scss']
})
export class LabelAndPointsComponent implements OnInit, OnDestroy {

  @ViewChild('cursor') cursorRef!: ElementRef;

  @Input() cursorWidth: number = 6;
  @Input() values!: Value[]
  @Input() points!: Point[]
  @Input() minRangeValue!: [ Value, Value ]

  @Input() container!: HTMLElement
  containerRect!: DOMRect 
  boardSize!: Point

  val: Value = { price: 0, timestamp: 0 }
  point: Point = { x: 0, y: 0 }

  display: boolean = false;

  unsuscriber$ = new Subject<void>();

  constructor(
    private lblSer: LabelAndPointsService
  ) {}

  ngOnInit(): void {
    const requiredKeys: (keyof this)[] = ['values', 'points', 'minRangeValue', 'container' ];

    requiredKeys
    .forEach(name => { if (!this[name]) throw new TypeError(`${name as string} Input is required`)})

    this.getContainerSize()

    fromEvent<MouseEvent>(this.container, 'mousemove')
    .subscribe(e => this.mouseEvent(e))

    fromEvent(this.container, 'mouseenter')
    .pipe(takeUntil(this.unsuscriber$))
    .subscribe(()=>this.display=true)

    fromEvent(this.container, 'mouseleave')
    .pipe(takeUntil(this.unsuscriber$))
    .subscribe(()=>this.display=false)
  }

  ngOnDestroy(): void {
    this.unsuscriber$.next();
    this.unsuscriber$.complete();
    this.unsuscriber$.unsubscribe();
}

  @HostListener('window:resize')
  getContainerSize(): void {
    this.containerRect = this.container.getBoundingClientRect()
    this.boardSize = { x: this.containerRect.width, y: this.containerRect.height }
  }

  mouseEvent(e: MouseEvent): void {
    const mousePos: Point = { 
      x: e.pageX - this.containerRect.left, 
      y: e.pageY - this.containerRect.top   
    }
    const y = this.lblSer.calculateLabelY(mousePos.x, this.points);
    
    this.point = { ...mousePos, y };
    this.val = this.lblSer.toValue(this.point, this.boardSize, ...this.minRangeValue);
  }
}