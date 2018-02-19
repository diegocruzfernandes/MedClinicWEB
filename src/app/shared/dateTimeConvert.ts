export function dateTimeConvert(date: Date) : string{
    let dtf = date.toString();
    let dt = dtf.split('T');
    let d = dt[0];
    let b = d.split('-');
    let h = dt[1].split(':');
    return b[2] +'/'+ b[1] + '/' + b[0] + ' ' + h[0] + ':' + h[1];
}