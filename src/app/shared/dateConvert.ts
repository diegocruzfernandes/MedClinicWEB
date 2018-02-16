export function dateConvert(date: Date) : string{
    let dtf = date.toString();
    let dt = dtf.split('T');
    let d = dt[0];

    let b = d.split('-');
    return b[2] +'/'+ b[1] + '/' + b[0];
}

