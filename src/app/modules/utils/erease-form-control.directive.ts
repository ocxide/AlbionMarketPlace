import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms'

@Directive({
  selector: '[appEreaseFormControl]',
  host: {
    '[style.display]': 'formControl.value ? "" : "none"'
  }
})
export class EreaseFormControlDirective implements OnInit {

  @Input('appEreaseFormControl') formControl!: AbstractControl

  constructor() { }

  ngOnInit(): void {
    if (!this.formControl) throw new TypeError('formControl Input is required')
  }

  @HostListener('click')
  erease() {
    this.formControl.setValue('')
  }

}
