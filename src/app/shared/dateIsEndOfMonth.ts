
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function dateIsEndOfMonth(control: AbstractControl): { [key: string]: any } {
    if (isPresent(Validators.required(control)))
        return null;

    const isISOdate = /\d{4}-\d{2}-\d{2}/.test(control.value);
    if (!isISOdate)
        return { 'dateIsEndOfMonth': true };
    const isValidDate = isDate(control.value);
    if (!isValidDate)
        return { 'dateIsEndOfMonth': true };
    const date = new Date(control.value.replace(/-/g, '\/'));

    return !isEndOfMonth(date) ? { 'dateIsEndOfMonth': true } : null;
}

function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

function isDate(obj: any): boolean {
    return !/Invalid|NaN/.test(new Date(obj).toString());
}

function isEndOfMonth(date: Date) {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + 1);
    return d.getDate() === 1;
}