import { Component, OnInit } from '@angular/core';
import { finalize, map, Observable, range, tap } from 'rxjs';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Value } from '@gold/interfaces/value';
import { sameDateFn } from '@gold/validators/same-date.validators';
import { GoldMarketService } from './services/gold-market.service';
@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

  
  minDate = new Date(new Date().getFullYear(), 5, 10)
  
  range = new FormGroup({
    start: new FormControl('', { nonNullable: true, validators: Validators.required }),
    end: new FormControl('', { nonNullable: true, validators: [Validators.required, sameDateFn('start')] })
  })
  minDate$ = (this.range.get('start')?.valueChanges)?.pipe(
    tap(console.log),
    map(date => {
    const d = new Date(date)
    d.setDate(d.getTime() + 1)
    return d
  }))

  maxDate = (() => {
    const d = new Date()
    d.setDate(d.getDate()+1)
    //d.setTime(d.getDate()-20)
    return d
  })()

  loadingData: boolean = false;

  messageErrors: { [key: string]: { [key: string]: string } } = {
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
  
  constructor(private glmServ: GoldMarketService) {}

  ngOnInit(): void {
  }

  
  submit() {
    if (this.range.invalid) return;

    this.minDate.setTime(this.minDate.getTime() + 1)

    this.loadingData = true;
    const { start, end } = this.range.value
    this.points$ = this.glmServ.getGoldPrices(start!, end!).pipe(finalize(() => this.loadingData = false))
  }

}