import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EreaseFormControlDirective } from './erease-form-control.directive';



@NgModule({
  declarations: [
    EreaseFormControlDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EreaseFormControlDirective
  ]
})
export class UtilsModule { }
