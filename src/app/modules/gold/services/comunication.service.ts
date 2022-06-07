import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../interfaces/point';
import { Value } from '../interfaces/value';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  onMove: Subject<MouseEvent> = new Subject();
  changePoints: Subject<Point[]> = new Subject();

  svg!: SVGAElement;

  points: Point[] = [];
  minMaxValue!: [Value, Value];

  insideSvg: { value: boolean } = { value: false };

  constructor() { }
}
