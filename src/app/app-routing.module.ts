import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketComponent } from './components/market/market.component';
import { GoldMarketComponent } from './components/gold-market/gold-market.component';
import { AnimationTestComponent } from './components/animation-test/animation-test.component';

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
    path: 'gold',
    component: GoldMarketComponent
  },
  {
    path: 'test',
    component: AnimationTestComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
