import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit, OnChanges {

  @Input() size: number = 6;
  @Input() values!: Value[];
  @Input() points!: Point[]
  @Input() boardSize!: Point

  points2: Point[] = [];

  value: Value = {
    price: 0,
    timestamp: 0
  }

  point: Point = {
    x: 0,
    y: 0
  }

  pointHover: boolean = false;

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['points']) {
        this.points = this.points.slice(1, -1).map(p => ({ x: p.x-(this.size/2.5), y: p.y-(this.size/2.5) }) )
      }
  }

  ngOnInit(): void {
    if (!this.values) throw new TypeError('values Input is required')
    if (!this.points) throw new TypeError('points Input is required')
    if (!this.boardSize) throw new TypeError('boardSize Input is required')
  }

  setPointValue(i: number) {
    this.value = this.values[i];
    this.point = {
      x: this.points[i].x + (this.size/2),
      y: this.points[i].y + (this.size/2)
    };
  }
}
