import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EreaseFormControlDirective } from '../../utils/directives/erease-form-control/erease-form-control.directive';

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
