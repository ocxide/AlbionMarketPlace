import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../interfaces/point';
import { PointValue } from '../interfaces/point-value';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  onMove: Subject<MouseEvent> = new Subject();
  changePoints: Subject<Point[]> = new Subject();

  svg!: SVGAElement;

  points: Point[] = [];
  minMaxValue!: [PointValue, PointValue];

  insideSvg: { value: boolean } = { value: false };

  constructor() { }
}
