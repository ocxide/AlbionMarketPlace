import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function sameDateFn(firstControl: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        const parent = control.parent
        if (!parent) { console.log('no parent'); return null }

        const start = parent.get(firstControl)
        return sameDate(new Date(start?.value), new Date(control.value)) ? { samedate: true } : null  
    }
}

export function sameDateValidator(firstControl: string, secondControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const start = control.get(firstControl)
        const end = control.get(secondControl)

        if (!start && !end) null
        if (sameDate(new Date(start?.value), new Date(end?.value)))
        return { samedate: true };
        return null;
    };
}

function sameDate(start: Date, end: Date) {
    return start.getTime() >= end.getTime();
}