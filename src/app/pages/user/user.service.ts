import { ConnService } from 'app/services/conn.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private path: string = '/v1/user';
  data: any;

  constructor(private conn: ConnService) { }

  getAllData(skip: number, take: number) {
      return this.conn.GetAll(this.path, skip, take);
  }

  getData(id: number) {
      return this.conn.GetFilter(this.path, id);
  }

  findData(text:string, skip: number, take: number ){
      return this.conn.Find(this.path+'/find', text, skip, take);
  }

  saveData(user) {
      return this.conn.Post(this.path, user)
  }

  updateData(user) {
      return this.conn.Put(this.path, user)
  }

  removeData(id: number) {
      return this.conn.Delete(this.path, id)
          .subscribe(
          res => { console.log(res); },
          err => { console.log("Erro: " + err); });
  }
}
