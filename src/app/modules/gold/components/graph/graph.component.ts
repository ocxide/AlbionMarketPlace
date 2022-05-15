import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef, SimpleChanges, HostListener, Host, Output, EventEmitter } from '@angular/core';
import { debounceTime, fromEvent, min, pairwise } from 'rxjs';
import { Point } from '../../interfaces/point';
import { PointValue } from '../../interfaces/point-value';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-graph[valuePoints]',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() valuePoints: PointValue[] = [];
  @Output("load") loadEmitter: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('graph') graph!: ElementRef;

  pointsRender: number[] = [];

  handler: Function = () => {};
  loaded: boolean = false;

  constructor(
    private com: ComunicationService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChanges = 
    (changes: SimpleChanges) => { 
      this.loaded = true;
      this.handler = this.render;
      this.handler();
      this.registerEvents();
      this.ngOnChanges = (changes: SimpleChanges) => { this.handler(); } 
    }
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      if (this.graph) {
        this.com.svg = this.graph.nativeElement;
        this.loadEmitter.emit(true);  
      } else console.log("svg not loaded")
    }, 0);
  }

  reLoad() {
    this.handler();
  }

  private render() {
    if (this.valuePoints.length < 2) throw new Error("Cannot render with less than 2 points");

    const svg = this.graph.nativeElement as SVGAElement;
    const first = this.valuePoints[0];
    const last = this.valuePoints[this.valuePoints.length - 1];

    const minPrice = this.valuePoints.reduce((prev, next) => prev.price > next.price ? next : prev).price;
    const maxPrice = this.valuePoints.reduce((prev, next) => prev.price < next.price ? next : prev).price;

    const timeDistance = last.timestamp - first.timestamp;
    const priceRange = maxPrice - minPrice;
    
    //Write Point
    const points: Point[] = [];
    points.push({ x: 0, y: svg.clientHeight });
    for(let valueP of this.valuePoints) 
      points.push(toPoint(
        valueP,
        { price: minPrice, timestamp: first.timestamp },
        { price: priceRange, timestamp: timeDistance }, 
        { x: svg.clientWidth, y: svg.clientHeight }
        ));
    points.push({ x: svg.clientWidth, y: svg.clientHeight });

    this.pointsRender = toNumberArray(points);

    //Update data
    this.com.changePoints.next(points);
    this.com.points = points;
    this.com.minMaxValue = [
      { price: minPrice, timestamp: this.valuePoints[0].timestamp },
      { price: priceRange, timestamp: timeDistance }
    ];
  }

  registerEvents() {
    fromEvent<MouseEvent>(this.graph.nativeElement, 'mousemove')
    .subscribe(s => this.com.onMove.next(s));
  }

  mouseEnterAndLeave(inside: boolean) {
    
    if (this.loaded) {
      this.mouseEnterAndLeave = (inside: boolean) => this.com.insideSvg.value = inside;
      this.mouseEnterAndLeave(inside);
    }
      
  }
}

function toPoint(pointValue: PointValue, minValue: PointValue, valueRange: PointValue, size: Point): Point {
  return {
    x: (size.x * ((pointValue.timestamp - minValue.timestamp)/valueRange.timestamp)),
    y: size.y * (1 - ((pointValue.price - minValue.price)/valueRange.price))
  };
}

function toNumberArray(points: Point[]): number[] {
  const res: number[] = [];
  for(let point of points) res.push(point.x, point.y);
  return res;
}