import { Injectable } from "@angular/core";
import { Point } from "@gold/interfaces/point";
import { Value } from "@gold/interfaces/value";


@Injectable({
    providedIn: 'root'
})
export class LabelAndPointsService {
    calculateLabelY(mousePosX: number, points: Point[]): number {
        const beforePoint = points.slice().reverse().find(p => p.x<=mousePosX) || points[0];
        const afterPoint = points.find(p => p.x>=mousePosX) || points[points.length-1];
    
        return ((afterPoint.y - beforePoint.y)*(mousePosX - beforePoint.x)/(afterPoint.x - beforePoint.x)) + beforePoint.y;
    }

    toValue(point: Point, size: Point, min: Value, range: Value): Value {
        return {
          price: Math.floor((range.price*-1*((point.y/size.y)-1) + min.price)*100)/100,
          timestamp: (range.timestamp*point.x/size.x) + min.timestamp
        }
    }
}