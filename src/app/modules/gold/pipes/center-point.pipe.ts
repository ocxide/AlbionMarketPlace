import { Pipe, PipeTransform } from '@angular/core';
import { Point } from '../interfaces/point';

@Pipe({
  name: 'centerPoint'
})
export class CenterPointPipe implements PipeTransform {

  transform(points: Point[], diameter: number): Point[] {
    return points?.map(point => ({ x: point.x-(diameter/2.5), y: point.y-(diameter/2.5) }))
  }

}
