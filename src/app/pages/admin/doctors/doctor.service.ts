import { ConnService } from './../../../services/conn.service';
import { Doctor } from './doctor.model';

import { Injectable } from '@angular/core';

@Injectable()
export class DoctorService {

    private path: string = '/v1/doctor';
    data: Doctor = new Doctor();

    constructor(
        private conn: ConnService
    ) { }

    getAllData(skip: number, take: number) {
        return this.conn.GetAll(this.path, skip, take);
    }

    getData(id: number) {
        return this.conn.GetFilter(this.path, id);
    }

    saveData(doctor: Doctor) {

        if (doctor.id > 0) {
            return this.conn.Post(this.path, doctor)
                .subscribe(
                res => { console.log(res); },
                err => { console.log("Erro: " + err); });
        } else {
            return this.conn.Put(this.path, doctor)
                .subscribe(
                res => { console.log(res); },
                err => { console.log("Erro: " + err); });
        }
    }

    removeData(id:number){
        return this.conn.Delete(this.path, id)
        .subscribe(
            res => { console.log(res); },
            err => { console.log("Erro: " + err); });
    }
}
