import { Injectable } from '@angular/core';


@Injectable()
export class DateTools {

    DateJsonToDateBR(date: Date) {
        let values = [];
        let data = new Date();

        let dia = data.getDate().toString();
        if (dia.toString().length == 1) dia = "0" + dia;
        values[0] = dia;

        let mes = data.getMonth() + 1; let mes2 = mes.toString();
        if (mes.toString().length == 1) mes2 = "0" + mes;
        values[1] = mes2;

        let ano = data.getFullYear();
        values[2] = ano;

        let hours = data.getHours().toString()
        if (hours.toString().length == 1) hours = "0" + hours
        values[3] = hours;

        let min = data.getMinutes().toString();
        if (min.toString().length == 1) min = "0" + min
        values[4] = min;

        return values[0]+'/'+values[1]+'/'+values[2]+' '+values[3]+':'+values[4]
    }

    JsonToDateSimple(date: Date) {
        let dtf = date.toString();
        let dt = dtf.split('T');
        let d = dt[0];

        let b = d.split('-');
        return b[2] + '/' + b[1] + '/' + b[0];
    }

    JsonToDateFull(date: Date) {
        let dtf = date.toString();
        let dt = dtf.split('T');
        let d = dt[0];

        let h = dt[1].split(':');

        let b = d.split('-');
        return b[2] + '/' + b[1] + '/' + b[0] + ' ' + h[0] + ':' + h[1];
    }


    StringToJsonDate(date: string) {
        let fulldates = date.split(' ');
        let d = fulldates[0].split('/');
        let h = fulldates[1].split(':');

        // yyyy-MM-ddTHH:mm
        return d[2] + '-' + d[1] + '-' + d[0] + 'T' + h[0] + ':' + h[1];
    }

    stringToDate(date: string): Date {
        let d = new Date(date);
        return d;
    }
}