import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { TypeConsult } from './type-consult.model';
import { ConnService } from './../../../services/conn.service';

@Injectable()
export class TypeConsultyService {

    private path: string = '/v1/typeconsult';
    data: TypeConsult = new TypeConsult();

    constructor(
        private conn: ConnService
    ) { }

    getAllData(skip: number, take: number) {
        return this.conn.GetAll(this.path, skip, take);
    }

    getData(id: number) {
        return this.conn.GetFilter(this.path, id);
    }

    saveData(typeConsult: TypeConsult) {
        return this.conn.Post(this.path, typeConsult)
    }

    updateData(typeConsult: TypeConsult) {
        return this.conn.Put(this.path, typeConsult)
    }

    removeData(id: number) {
        return this.conn.Delete(this.path, id)
            .subscribe(
            res => { console.log(res); },
            err => { console.log("Erro: " + err); });
    }
}