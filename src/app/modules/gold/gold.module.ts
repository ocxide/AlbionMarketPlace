import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoldRoutingModule } from './gold-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { CenterPointPipe } from './pipes/center-point.pipe';

import { GoldMarketComponent } from './components/gold-market/gold-market.component';
import { GraphComponent } from './components/graph/graph.component';
import { LabelAndPointsComponent } from './components/label-and-points/label-and-points.component';
import { LabelComponent } from './components/label/label.component';
import { PointsComponent } from './components/points/points.component';

@NgModule({
  declarations: [
    GoldMarketComponent,
    GraphComponent,
    LabelAndPointsComponent,
    PointsComponent,
    LabelComponent,
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
