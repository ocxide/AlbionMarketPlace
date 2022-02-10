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

import { MarketComponent } from './components/market/market.component';
import { CompareItemsComponent } from './components/compare-items/compare-items.component';
import { QualitifyPipe } from './pipes/qualitify.pipe';
import { CoinPipe } from './pipes/coin.pipe';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    QualitifyPipe,
    CoinPipe,
    ItemTableComponent,
    ItemSearchComponent,
    CompareItemsComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
