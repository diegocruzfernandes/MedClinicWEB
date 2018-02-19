import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { ConnService } from 'app/services/conn.service';
import { Schedule } from './schedule.model';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';

@Injectable()
export class ScheduleService {

    private path: string = '/v1/schedule';
    data: Schedule = new Schedule();

    constructor(private conn: ConnService) { }

    getAllData(skip: number, take: number) {
        return this.conn.GetAll(this.path, skip, take);
    }

    getData(id: number) {
        return this.conn.GetFilter(this.path, id);
    }

    findDetails(skip: number, take: number, text: string, doctorId: number, statusId: number ){
        return this.conn.FindDetails(this.path, skip, take, text, doctorId, statusId)
    }

    saveData(schedule: Schedule) {
        return this.conn.Post(this.path, schedule)    
    }

    updateData(schedule: Schedule){
        return this.conn.Put(this.path, schedule)
    }

    removeData(id:number){
        return this.conn.Delete(this.path, id)
        .subscribe(
            res => { res; },
            err => { console.log("Erro: " + err); });
    }
}