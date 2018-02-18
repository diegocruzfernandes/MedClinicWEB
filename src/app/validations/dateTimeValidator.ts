import { AbstractControl } from '@angular/forms';

export function dateTimeValidator(control: AbstractControl){
    if(control.value == 0 ){
        return {
            defaultValue: true
        }
    }
}