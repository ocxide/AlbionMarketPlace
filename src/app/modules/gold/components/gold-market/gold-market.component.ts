import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Value } from '../../interfaces/value';
import { GraphComponent } from '../graph/graph.component';
import { LabelComponent } from '../label/label.component';
import { PointsComponent } from '../points/points.component';
import { sameDateValidator } from '../../validators/same-date.validators';

@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

  @ViewChild(GraphComponent) graphComponent!: GraphComponent;
  @ViewChild(LabelComponent) labelComponent!: LabelComponent;
  @ViewChild(PointsComponent) pointsComponent!: PointsComponent;

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  },
  { 
    validators: sameDateValidator('start', 'end')
  });

  valuePoints: Value[] = [];
  messageError: string | null = null;
  svgLoad = false;

  @HostListener('window:resize') 
  private onResize() {
    this.graphComponent.reLoad();
    this.labelComponent.reload();
    this.pointsComponent.reload();
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.range.invalid) return;

    this.getGoldPrices(
      new Date(this.range.controls['start'].value),
      new Date(this.range.controls['end'].value)
    )
    .pipe(
      map(values => 
        values.map(value => ({...value, timestamp: new Date(value.timestamp).getTime() }))
      )
    )
    .subscribe(data => this.valuePoints = data);
  }

  getGoldPrices(start: Date, end: Date) {
    return this.http.get<DataPoint[]>(`https://www.albion-online-data.com/api/v2/stats/gold?date=${start.toJSON()}&end_date=${+end.toJSON()}`);
  }

  load() {
    this.svgLoad = true;
  }
}

interface DataPoint {
  price: number,
  timestamp: string 
}
