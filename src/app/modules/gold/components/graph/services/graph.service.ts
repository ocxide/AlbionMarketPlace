import { Injectable } from "@angular/core";
import { Point } from "../../../interfaces/point";
import { Value } from "../../../interfaces/value";

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    toPoints(values: [ Value, ...Value[] ], board: Point, minValue: Value, rangeValue: Value): Point[] {
        const points: Point[] = [{ x: 0, y: board.y }];

        values.forEach(value => {
            const rawPoint: Point = {
                x: (board.x*(value.timestamp - minValue.timestamp)/rangeValue.timestamp) || 0,
                y: (board.y * (1 - ((value.price - minValue.price)/rangeValue.price))) || 0
            }
    
            points.push(rawPoint)
        })
    
        points.push(board)
    
        return points
    }

    checkedToPoints(values: Value[], board: Point): [ Point[], [ Value, Value ] ] {
        if (values.length < 1) throw new Error('Cannot calculate points with less than 1 point')
    
        values = values.sort((a, b) => a.timestamp - b.timestamp)

        const minValue: Value = { 
            price: values.reduce((prev, next) => prev.price < next.price ? prev : next).price, 
            timestamp: values[0].timestamp 
        }

        const rangeValue: Value = {
            timestamp: values[values.length-1].timestamp - values[0].timestamp,
            price: (
                values.reduce((prev, next)=> prev.price > next.price ? prev : next).price - 
                minValue.price
            )
        }

        return [ 
            this.toPoints(values as [Value, ...Value[]], board, minValue, rangeValue), 
            [ minValue, rangeValue ] 
        ]
    }
}