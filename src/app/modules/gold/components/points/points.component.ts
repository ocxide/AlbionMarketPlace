import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit, AfterViewInit {

  @Input() size: number = 6;
  @Input() values: Value[] = [];

  points: Point[] = [];
  value: Value = {
    price: 0,
    timestamp: 0
  }
  point: Point = {
    x: 0,
    y: 0
  }

  pointHover: boolean = false;

  containerSize: Point  = { x: 0, y: 0 };

  reload() {
    const size = this.linkSev.svg.getBoundingClientRect();
    this.containerSize = { x: size.width, y: size.height };
  }

  constructor(
    private linkSev: ComunicationService
  ) { }

  ngOnInit(): void {
    this.linkSev.changePoints
    .pipe(map(points => points.slice(1, -1).map(p => ({ x: p.x-(this.size/2.5), y: p.y-(this.size/2.5) }) ) ))
    .subscribe(points => this.points = points);
  }

  ngAfterViewInit(): void {
      this.reload();
  }

  setPointValue(i: number) {
    this.value = this.values[i];
    this.point = {
      x: this.points[i].x + (this.size/2),
      y: this.points[i].y + (this.size/2)
    };
  }
}
