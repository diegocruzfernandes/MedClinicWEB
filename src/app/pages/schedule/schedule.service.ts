import { ConnService } from 'app/services/conn.service';
import { Schedule } from './schedule.model';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

    saveData(schedule: Schedule) {

        if (schedule.id > 0) {
            return this.conn.Post(this.path, schedule)
                .subscribe(
                res => { console.log(res); },
                err => { console.log("Erro: " + err); });
        } else {
            return this.conn.Put(this.path, schedule)
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