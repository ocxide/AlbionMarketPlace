import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function sameDateValidator(firstControl: string, secondControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        if (typeof control.value !== "object") return null;
        if (!control.value[firstControl] || !control.value[secondControl]) return null;
        if (
            sameDate(
                new Date(control.value[firstControl]), 
                new Date(control.value[secondControl])
                )
            )
        return { samedate: true };
        return null;
    };
}

function sameDate(start: Date, end: Date) {
    return start.getTime() >= end.getTime();
}