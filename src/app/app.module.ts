import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'

import { MarketComponent } from './components/market/market.component';
import { QualitifyPipe } from './pipes/qualitify.pipe';
import { CoinPipe } from './pipes/coin.pipe';
import { ItemTableComponent } from './components/item-table/item-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    QualitifyPipe,
    CoinPipe,
    ItemTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
