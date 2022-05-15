import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'controlValid',
})
export class FormControlValidPipe implements PipeTransform {

  transform(control: AbstractControl): boolean {
      console.log("da");
      return control.invalid && control.touched;
  }

}
