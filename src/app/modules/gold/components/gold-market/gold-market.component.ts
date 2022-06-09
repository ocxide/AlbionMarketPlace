import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Value } from '../../interfaces/value';
import { GraphComponent } from '../graph/graph.component';
import { LabelAndPointsComponent } from '../label-and-points/label-and-points.component';
import { PointsComponent } from '../points/points.component';
import { sameDateValidator } from '../../validators/same-date.validators';

type control<F extends FormGroup> = keyof F['controls']

@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

  @ViewChild(GraphComponent) graphComponent!: GraphComponent;
  @ViewChild(LabelAndPointsComponent) labelComponent!: LabelAndPointsComponent;
  @ViewChild(PointsComponent) pointsComponent!: PointsComponent;

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  },
  { 
    validators: sameDateValidator('start', 'end')
  });

  messageErrors: { 
    [key: string]: { [key: string]: string } 
  } = {
    'start': {
      'required': 'Date Required',
      'invalid': 'Date invalid'
    },
    'end': {
      'required': 'Date Required',
      'invalid': 'Date invalid'
    },
    'range': {
      'samedate': 'Date too low!'
    }
  }

  valuePoints?: Value[];
  loadingData: Boolean = false
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  
  submit() {
    if (this.range.invalid) return;

    this.loadingData = true

    this.getGoldPrices(
      new Date(this.range.value.start),
      new Date(this.range.value.end)
    )
    .pipe(
      map(values => 
        values.map(value => ({...value, timestamp: new Date(value.timestamp).getTime() }))
      )
    )
    .subscribe({
      next: data => this.valuePoints = data,
      complete: () => this.loadingData = false
    });
  }

  getGoldPrices(start: Date, end: Date) {
    return this.http.get<DataPoint[]>(`https://www.albion-online-data.com/api/v2/stats/gold?date=${start.toJSON()}&end_date=${end.toJSON()}`);
  }
}

interface DataPoint {
  price: number,
  timestamp: string 
}
