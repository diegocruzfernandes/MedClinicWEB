
import { ConnService } from './../../../services/conn.service';
import { Doctor } from './doctor.model';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
        return this.conn.Post(this.path, doctor);
    }

    updateData(doctor:Doctor){
        return this.conn.Put(this.path, doctor);
    }

    removeData(id:number){
        return this.conn.Delete(this.path, id)
        .subscribe(
            res => { console.log(res); },
            err => { console.log("Erro: " + err); });
    }
}
