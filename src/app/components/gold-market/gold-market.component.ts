import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  valuePoints: PointValue[] = [];
  max_date!: number;
  min_date!: number;
  max_price!: number;
  min_price!: number;

  graphContainer!: SVGSVGElement;

  graphContainerLeft!: number;

  labelPosition: { left: string, top: string } = { left: '0px', top: '0px' };

  expectedPointV: PointValue = { price: 0, timestamp: 0 };
  currentPointV: PointValue = { price: 0, timestamp: 0 };

  currentPrice!: number;
  currentDate!: Date;

  linePoints: number[] = [];
  pointsToRender: number[] = [];
  pointsToRenderDouble: Point[] = [];

  clicked: boolean = false;
  inside: boolean = false;
  graphLoaded: boolean = false;

  @ViewChildren('circle') circleNL!: QueryList<ElementRef>;
  @ViewChild('mainLabel') mainLabel!: ElementRef;

  constructor(
    private _http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.graphContainer = document.querySelector('#id')!;
    this.graphContainerLeft = this.graphContainer.getBoundingClientRect().left!;
  }

  pointToRender(pointV: PointValue): Point {
    const width = this.graphContainer.width.animVal.value;
    let x = (width/(this.max_date-this.min_date))*(pointV.timestamp - this.min_date);

    const height = this.graphContainer.height.animVal.value;
    let y = height - ( (height/(this.max_price-this.min_price))*(pointV.price-this.min_price) );
    return { x, y };
  }

  convertToPoints(primitivePoints: number[]): { x: number; y: number }[] {
    if (primitivePoints.length % 2 != 0) return [];

    let response = [];
    for(let i = 2; i < primitivePoints.length-2; i+=2) 
      response.push({ x: primitivePoints[i], y: primitivePoints[i+1] });
    
    return response;
  }

  renderLine(e: any):void {
    var x = e.clientX - this.graphContainerLeft; //x position within the element.
    const height = this.graphContainer.height.animVal.value;
    const width = this.graphContainer.width.animVal.value;

    const width_ = 1;   
    this.linePoints = [ x, height, x, 0, x + width_, 0, x + width_, height ];

    this.moveLabel(x, width);
  }

  moveLabel(x: number, width: number) {
    //Calc Expectect Date
    let expectedDate: number = (x * (this.max_date - this.min_date)/width) + this.min_date;
    //let expectedDate: number = Math.floor( ((x * Math.floor((this.max_date - this.min_date)/width)) + this.min_date)/1000 )*1000;

    let minorPoint: PointValue = this.valuePoints.slice().reverse().find(p => p.timestamp < expectedDate)!;
    let mayorPoint: PointValue = this.valuePoints.find(p => p.timestamp > expectedDate)!;
    if ( minorPoint == undefined || mayorPoint == undefined) return;

    let expectedPrice: number;
    if (minorPoint.price == mayorPoint.price) expectedPrice = minorPoint.price;
    else 
    expectedPrice = 
    ( 
      (expectedDate - minorPoint.timestamp)*(mayorPoint.price - minorPoint.price)/(mayorPoint.timestamp - minorPoint.timestamp) 
    ) + minorPoint.price;
    
    this.expectedPointV = { price: Math.round( expectedPrice*100 )/100, timestamp: expectedDate };
    const point = this.pointToRender({price: expectedPrice, timestamp: expectedDate});
    //Render Label
    this.labelPosition = { 
      top: (
        50 + point.y > this.graphContainer.height.baseVal.value ? 
        point.y - 50 : 
        point.y
        ).toString() + 'px',
      left: (
        200 + x > this.graphContainer.width.baseVal.value ? 
        x - 200 - 4 : 
        x + 4
      ).toString() + 'px' 
    };

    return;
  }

  moveMainLabel(point: Point, i: number) {
    this.currentPointV = this.valuePoints[i];
    (this.mainLabel.nativeElement as HTMLElement).style.display = 'block';

    (this.mainLabel.nativeElement as HTMLElement).style.top = (
      (this.mainLabel.nativeElement as HTMLElement).clientHeight + point.y > this.graphContainer.height.baseVal.value ? 
      point.y - (this.mainLabel.nativeElement as HTMLElement).clientHeight : 
      point.y
    ).toString() + 'px';

    (this.mainLabel.nativeElement as HTMLElement).style.left = (
      (this.mainLabel.nativeElement as HTMLElement).clientWidth + point.x > this.graphContainer.width.baseVal.value ? 
      point.x - (this.mainLabel.nativeElement as HTMLElement).clientWidth - 8 : 
      point.x + 8
    ).toString() + 'px';
    
  }

  disappearLabel() {
    (this.mainLabel.nativeElement as HTMLElement).style.display = 'none';
  }

  renderGraph(): void {
    const height = this.graphContainer.height.animVal.value;

    let first = this.valuePoints[0];
    let end = this.valuePoints[this.valuePoints.length - 1];
    this.pointsToRender = [];

    this.pointsToRender.push(this.pointToRender(first).x);
    this.pointsToRender.push(height);

    this.valuePoints.forEach((point) => {
      let p = this.pointToRender(point);
      this.pointsToRender.push(p.x);
      this.pointsToRender.push(p.y);
    });

    this.pointsToRender.push(this.pointToRender(end).x);
    this.pointsToRender.push(height);

    this.pointsToRenderDouble = this.convertToPoints(this.pointsToRender);
    this.graphLoaded = true;
  }

  submit() {
    if (this.range.invalid) return;

    this.graphLoaded = false;

    this.getGoldPrices(
      this.range.controls['start'].value,
      this.range.controls['end'].value
    )
    .pipe(
      map(data => 
        { 
          return data.map( (value: { price: number, timestamp: string }) => 
            { 
              return { price: value.price, timestamp: new Date(value.timestamp) };
            })
        })
    )
    .subscribe({
        next: (data: { price: number, timestamp: Date }[]) => {
          this.max_price = data[0].price;
          this.min_price = data[0].price;
          data.forEach((gold: { price: number, timestamp: Date})=> {
            if (this.max_price < gold.price) this.max_price = gold.price;
            if (this.min_price > gold.price) this.min_price = gold.price;
          });
    
          this.max_date = data[data.length - 1].timestamp.getTime()/1000;
          this.min_date = data[0].timestamp.getTime()/1000;
          
          this.valuePoints = data.map((pv: { price: number, timestamp: Date })=> { return { ...pv, timestamp: pv.timestamp.getTime()/1000 }; });
        }, 
        complete: () => {
          this.renderGraph();
          if (!this.clicked) {
            this.graphContainer.addEventListener('mousemove', this.renderLine.bind(this), false);
            this.graphContainer.addEventListener('mouseenter', ( ()=>{this.inside = true; } ).bind(this), false);
            this.clicked = true; //No tocar
          }
        }
      });
  }

  getGoldPrices(start: Date, end: Date): Observable<any> {
    return this._http.get('https://www.albion-online-data.com/api/v2/stats/gold?date='+start.toJSON()+'&end_date='+end.toJSON());
  }
}

interface Point {
  x: number;
  y: number;
}

interface PointValue {
  timestamp: number,
  price: number
}