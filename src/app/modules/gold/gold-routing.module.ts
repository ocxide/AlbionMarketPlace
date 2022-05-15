import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldMarketComponent } from './components/gold-market/gold-market.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GoldMarketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldRoutingModule { }
