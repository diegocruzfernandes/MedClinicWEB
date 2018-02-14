import { ConnService } from 'app/services/conn.service';
import { Injectable } from '@angular/core';
import { Patient } from 'app/pages/patient/patient.model';

@Injectable()
export class PatientService {

    private path: string = '/v1/patient';
    data: Patient = new Patient();

    constructor(private conn: ConnService) { }

    getAllData(skip: number, take: number) {
        return this.conn.GetAll(this.path, skip, take);
    }

    getData(id: number) {
        return this.conn.GetFilter(this.path, id);
    }

    saveData(patient: Patient) {

        if (patient.id > 0) {
            return this.conn.Post(this.path, patient)
                .subscribe(
                res => { console.log(res); },
                err => { console.log("Erro: " + err); });
        } else {
            return this.conn.Put(this.path, patient)
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
