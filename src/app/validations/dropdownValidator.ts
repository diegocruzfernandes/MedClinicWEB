import { AbstractControl } from '@angular/forms';

export function ValidateDropDown(control: AbstractControl){
    if(control.value == 0 ){
        return {
            defaultValue: true
        }
    }
}