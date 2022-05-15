import { Pipe, PipeTransform } from '@angular/core';
import { Point } from '../interfaces/point';

@Pipe({
  name: 'handlePoints',
  pure: false
})
export class HandlePointsPipe implements PipeTransform {

  transform(points: Point[], size: number): Point[] {
    const res = points.slice(1, -1).map(p => { return { x: p.x-1.5, y: p.y-(size/2) }; });

    console.log(res);

    return res;
  }

}
