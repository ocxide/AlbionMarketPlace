import { 
  Component, Input, OnInit, AfterViewInit, 
  ViewChild, ElementRef, ChangeDetectorRef, 
  HostListener, OnChanges 
} from '@angular/core';

import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';
import { toPoints } from './calc';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() values!: Value[];

  @ViewChild('graph') graph!: ElementRef;

  svgSize?: Point
  
  pointsRender?: number[];
  points?: Point[]
  minRangeValue?: [ Value, Value ]

  display: boolean = false

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges() {
    this.ngOnChanges = () => this.render()
  }

  ngOnInit(): void {
    if (!this.values) throw new TypeError('values Input is required')
  }

  ngAfterViewInit(): void {
    const svg = (this.graph.nativeElement as SVGAElement)

    const boardSize = svg.getBoundingClientRect()
    this.svgSize = { x: boardSize.width, y: boardSize.height }
    this.render()

    this.cd.detectChanges()
  }

  private chekedCalculatePoints(values: Value[], board: Point): [ Point[], [ Value, Value ] ] {
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
      toPoints(values as [Value, ...Value[]], board, minValue, rangeValue), 
      [ minValue, rangeValue ] 
    ]
  }

  private updateSvgSize() {
    const boardSize = this.graph.nativeElement.getBoundingClientRect()
    this.svgSize = { x: boardSize.width, y: boardSize.height }
  }

  @HostListener('window:resize')
  reRender() {
    this.updateSvgSize()

    this.points = toPoints(this.values as [Value, ...Value[]], this.svgSize!, ...this.minRangeValue!)
    this.pointsRender = this.points.reduce((acc, next) => [...acc, next.x, next.y], [] as number[])
  }

  private render() {
    const [ points, minRange ] = this.chekedCalculatePoints(this.values, this.svgSize!)

    this.minRangeValue = minRange
    this.points = points
    this.pointsRender = points.reduce((acc, next) => [...acc, next.x, next.y], [] as number[])
  }
}