import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Value } from '../../interfaces/value';
import { sameDateValidator } from '../../validators/same-date.validators';
import { GoldMarketService } from './services/gold-market.service';
@Component({
  selector: 'app-gold-market',
  templateUrl: './gold-market.component.html',
  styleUrls: ['./gold-market.component.scss']
})
export class GoldMarketComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl('', { nonNullable: true, validators: Validators.required }),
    end: new FormControl('', { nonNullable: true, validators: Validators.required })
  }, {
    validators: sameDateValidator('start', 'end')
  })

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
    
    const { start, end } = this.range.value
    this.points$ = this.glmServ.getGoldPrices(start!, end!)
  }

}