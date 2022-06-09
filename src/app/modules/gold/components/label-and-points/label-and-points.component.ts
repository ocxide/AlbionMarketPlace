import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';

@Component({
  selector: 'app-label',
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

  $unsuscriber: Subject<void> = new Subject();

  val: Value = { price: 0, timestamp: 0 }
  point: Point = { x: 0, y: 0 }

  display: boolean = false

  constructor(
  ) { }

  ngOnInit(): void {
    const requiredKeys: (keyof this)[] = ['values', 'points', 'minRangeValue', 'container' ];

    requiredKeys
    .forEach(name => { if (!this[name]) throw new TypeError(`${name} Input is required`)})

    this.getContainerSize()

    fromEvent<MouseEvent>(this.container, 'mousemove')
    .subscribe(e => this.mouseEvent(e))

    fromEvent(this.container, 'mouseenter')
    .pipe(takeUntil(this.$unsuscriber))
    .subscribe(()=>this.display=true)

    fromEvent(this.container, 'mouseleave')
    .pipe(takeUntil(this.$unsuscriber))
    .subscribe(()=>this.display=false)
  }

  ngOnDestroy(): void {
      this.$unsuscriber.next();
      this.$unsuscriber.complete;
      this.$unsuscriber.unsubscribe();
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

    const containerSize: Point = { x: this.containerRect.width, y: this.containerRect.height }

    const y = this.calculateLabelY(mousePos.x, this.points);

    this.point = {
      x: mousePos.x,
      y
    };

    this.val = this.toValue(this.point, containerSize, ...this.minRangeValue);
  }

  private calculateLabelY(mousePos: number, points: Point[]): number {
    const beforePoint = points.slice().reverse().find(p => p.x<=mousePos) || points[0];
    const afterPoint = points.find(p => p.x>=mousePos) || points[points.length-1];

    return ((afterPoint.y - beforePoint.y)*(mousePos - beforePoint.x)/(afterPoint.x - beforePoint.x)) + beforePoint.y;
  } 

  private toValue(point: Point, size: Point, min: Value, range: Value): Value {
    return {
      price: Math.floor((range.price*-1*((point.y/size.y)-1) + min.price)*100)/100,
      timestamp: (range.timestamp*point.x/size.x) + min.timestamp
    }
  }
}