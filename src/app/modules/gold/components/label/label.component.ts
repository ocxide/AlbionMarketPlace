import { Component, OnInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {

  @ViewChild('cursor') cursorRef!: ElementRef;

  @Input() cursorWidth: number = 6;
  @Input() values: Value[] = [];
  
  $unsuscriber: Subject<void> = new Subject();

  boundX!: number;
  svgWidth!: number;
  svgHeight!: number;

  inSvg: { value: boolean } = { value: false };

  val: Value = {
    price: 0,
    timestamp: 0
  };

  point: Point = {
    x: 0,
    y: 0
  }

  constructor(
    private linkSev: ComunicationService
  ) { }

  ngOnInit(): void {
    this.reload();
    this.inSvg = this.linkSev.insideSvg;

    this.linkSev.onMove
    .subscribe(e => {
      this.moveLabel(e)
    });
  }

  ngOnDestroy(): void {
      this.$unsuscriber.next();
      this.$unsuscriber.complete;
      this.$unsuscriber.unsubscribe();
  }
  
  reload() {
    const bound = this.linkSev.svg.getBoundingClientRect();
    this.boundX = bound.x;
    this.svgWidth = bound.width;
    this.svgHeight = bound.height;
  }

  private moveLabel(e: MouseEvent) {
    const mousePos = e.clientX - this.boundX;

    const y = this.calculateLabelY(mousePos);

    this.point = {
      x: mousePos,
      y
    };

    (this.cursorRef.nativeElement as HTMLElement).style.left = mousePos + 'px';
    (this.cursorRef.nativeElement as HTMLElement).style.top = y + 'px';

    this.val = this.toValue({ x: mousePos, y });
  }

  private calculateLabelY(mousePos: number): number {
    const beforePoint = this.linkSev.points.slice().reverse().find(p => p.x<=mousePos);
    const afterPoint = this.linkSev.points.find(p => p.x>=mousePos);

    if (!beforePoint) return afterPoint!.y;

    return ((afterPoint!.y - beforePoint!.y)*(mousePos - beforePoint!.x)/(afterPoint!.x - beforePoint!.x)) + beforePoint!.y;
  } 

  private toValue(point: Point): Value {
    const min = this.linkSev.minMaxValue[0];
    const range = this.linkSev.minMaxValue[1];

    const size: Point = {
      x: this.svgWidth,
      y: this.svgHeight
    };

    return {
      price: Math.floor((range.price*-1*((point.y/size.y)-1) + min.price)*100)/100,
      timestamp: (range.timestamp*point.x/size.x) + min.timestamp
    }
  }
}

