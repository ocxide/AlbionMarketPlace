import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EreaseFormControlDirective } from './erease-form-control.directive';

@NgModule({
  imports: [
    CommonModule,
    EreaseFormControlDirective
  ],
  exports: [
    EreaseFormControlDirective
  ]
})
export class UtilsModule { }
