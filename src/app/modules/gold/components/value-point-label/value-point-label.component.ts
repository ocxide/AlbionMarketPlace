import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';

@Component({
  selector: 'value-point-label[point][display][containerSize]',
  templateUrl: './value-point-label.component.html',
  host: {
    "[style.display]": "display ? 'inline-block' : 'none'"
  },
  styleUrls: ['./value-point-label.component.scss']
})
export class ValuePointLabelComponent implements OnInit, OnChanges {

  @Input() value: Value = {
    price: 0,
    timestamp: 0
  };

  @Input() point: Point = {
    x: 0,
    y: 0
  };

  @Input() display: boolean = false;

  @Input() containerSize!: Point;

  @Input() offset: Point = {
    x: 20,
    y: 10
  };

  constructor(
    private hostRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.ngOnChanges = (changes: SimpleChanges) => {
      if (changes['point'])
      setTimeout(()=>{
        const label: HTMLElement = this.hostRef.nativeElement;

        label.style.left = this.getX(this.point.x, label.clientWidth, this.offset.x, this.containerSize.x) + 'px';
        label.style.top = this.getY(this.point.y, label.clientHeight +this.offset.y, this.containerSize.y) + 'px';
      }, 0);
    }
  }

  private getX(pos: number, size: number, offset: number, max: number) {
    size += offset;
    return size + pos > max ?
            pos - size : pos + offset
  }

  private getY(pos: number, size: number, max: number) {
    return Math.max(2, Math.min(max-size-2, pos - size/2 ));
  }

}
