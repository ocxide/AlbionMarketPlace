import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MarketComponent } from './components/market/market.component';
import { QualitifyPipe } from './pipes/qualitify.pipe';
import { CoinPipe } from './pipes/coin.pipe';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { GoldMarketComponent } from './components/gold-market/gold-market.component';
import { ToDatePipe } from './pipes/to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    QualitifyPipe,
    CoinPipe,
    ItemTableComponent,
    ItemSearchComponent,
    GoldMarketComponent,
    ToDatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
