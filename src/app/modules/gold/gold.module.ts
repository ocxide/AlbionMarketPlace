import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GoldRoutingModule } from './gold-routing.module';
import { ToDatePipe } from './pipes/to-date.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoldMarketComponent } from './components/gold-market/gold-market.component';
import { MatInputModule } from '@angular/material/input';
import { GraphComponent } from './components/graph/graph.component';
import { LabelAndPointsComponent } from './components/label-and-points/label-and-points.component';
import { PointsComponent } from './components/points/points.component';
import { HandlePointsPipe } from './pipes/handle-points.pipe';
import { LabelComponent } from './components/value-point-label/value-point-label.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControlValidPipe } from './pipes/form-control-valid.pipe';
import { CenterPointPipe } from './pipes/center-point.pipe';


@NgModule({
  declarations: [
    GoldMarketComponent,
    ToDatePipe,
    GraphComponent,
    LabelAndPointsComponent,
    PointsComponent,
    HandlePointsPipe,
    LabelComponent,
    FormControlValidPipe,
    CenterPointPipe
  ],
  imports: [
    CommonModule,
    GoldRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class GoldModule { }
