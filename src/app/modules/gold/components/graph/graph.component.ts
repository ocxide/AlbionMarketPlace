import { 
  Component, Input, OnInit, AfterViewInit, 
  ViewChild, ElementRef, ChangeDetectorRef, 
  HostListener, OnChanges 
} from '@angular/core';

import { Point } from '../../interfaces/point';
import { Value } from '../../interfaces/value';
import { GraphService } from './services/graph.service';

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

  constructor(private cd: ChangeDetectorRef, private grServ: GraphService) { }

  ngOnChanges() {
    this.ngOnChanges = () => this.render()
  }

  ngOnInit(): void {
    if (!this.values) throw new TypeError('values Input is required')
  }

  ngAfterViewInit(): void {
    const svg = (this.graph.nativeElement as SVGAElement)

    this.updateSvgSize()
    this.render()

    this.cd.detectChanges()
  }

  private updateSvgSize() {
    const boardSize = this.graph.nativeElement.getBoundingClientRect()
    this.svgSize = { x: boardSize.width, y: boardSize.height }
  }

  @HostListener('window:resize')
  reRender() {
    this.updateSvgSize()

    this.points = this.grServ.toPoints(this.values as [Value, ...Value[]], this.svgSize!, ...this.minRangeValue!)
    this.pointsRender = this.points.reduce((acc, next) => [...acc, next.x, next.y], [] as number[])
  }

  render() {
    const [ points, minRange ] = this.grServ.checkedToPoints(this.values, this.svgSize!)

    this.minRangeValue = minRange
    this.points = points
    this.pointsRender = points.reduce((acc, next) => [...acc, next.x, next.y], [] as number[])
  }
}