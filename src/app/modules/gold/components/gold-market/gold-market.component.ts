import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Value } from '../../interfaces/value';
import { GraphComponent } from '../graph/graph.component';
import { LabelAndPointsComponent } from '../label-and-points/label-and-points.component';
import { PointsComponent } from '../points/points.component';
import { sameDateValidator } from '../../validators/same-date.validators';
import { GoldMarketService } from './services/gold-market.service';
@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

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

  points$?: Observable<Value[]>;
  
  constructor(
    private glmServ: GoldMarketService
  ) { }

  ngOnInit(): void {
  }

  
  submit() {
    if (this.range.invalid) return;
    this.points$ = this.glmServ.getGoldPrices(this.range.value.start, this.range.value.end)
  }

}