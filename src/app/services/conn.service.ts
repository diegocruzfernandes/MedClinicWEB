
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConnService {

    private serviceUrl: string = environment.apiUrl;
  
    constructor(private http: Http) { }

    ngOnInit() {
    }

    GetFilter(path: string, data: any) {
        return this.http
            .get(this.serviceUrl + path + "/" + data)
    }

    GetAll(path: string, skip: number, take:number) {  
        let page: string;
        if(skip > 0 && take > 0){
            page = "?page_size="+skip+"&page="+take;
        }        
        return this.http
            .get(this.serviceUrl + path + page)
            .map((res: Response) => res.json());            
    }

    Post(path: string, data: any): Observable<any> {
        let options: RequestOptions;       
        let headers = new Headers({ 'Content-Type': 'application/json' });        
        options = new RequestOptions({ headers: headers });        
        return this.http
            .post(this.serviceUrl + path, data, options)           
    }

    Delete(path: string, id: number) {
        let options: RequestOptions;       
        let headers = new Headers({ 'Content-Type': 'application/json' });
        options = new RequestOptions({ headers: headers });
        return this.http
            .delete(this.serviceUrl + path + "/" + id, options)            
    }

    Put(path: string, data: any) {
        let options: RequestOptions;
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        options = new RequestOptions({ headers: headers });
        return this.http
            .put(this.serviceUrl + path, JSON.stringify(data), options)
    }
}