import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    loadChildren: () => import("./modules/search/search.module").then(m => m.SearchModule)
  },
  {
    path: 'gold',
    loadChildren: () => import("./modules/gold/gold.module").then(m => m.GoldModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
