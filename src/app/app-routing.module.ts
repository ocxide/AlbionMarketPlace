import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareItemsComponent } from './components/compare-items/compare-items.component';

import { MarketComponent } from './components/market/market.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    component: MarketComponent
  },
  {
    path: 'compare',
    component: CompareItemsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
