import { ConnService } from './../../../services/conn.service';
import { Injectable } from '@angular/core';
import { Secretary } from './secretary.model';

@Injectable()
export class SecretaryService {

    private path: string = '/v1/secretary';
    data: Secretary = new Secretary();

    constructor(
        private conn: ConnService
    ) { }

    getAllData(skip: number, take: number) {
        return this.conn.GetAll(this.path, skip, take);
    }

    getData(id: number) {
        return this.conn.GetFilter(this.path, id);
    }

    saveData(secretary: Secretary) {
        return this.conn.Post(this.path, secretary);
    }

    updateData(secretary: Secretary) {
        return this.conn.Put(this.path, secretary)
    }

    removeData(id: number) {
        return this.conn.Delete(this.path, id)
            .subscribe(
            res => { console.log(res); },
            err => { console.log("Erro: " + err); });
    }
}