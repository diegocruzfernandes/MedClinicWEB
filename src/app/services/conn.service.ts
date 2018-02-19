import { Router, ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class ConnService {

    private serviceUrl: string = environment.apiUrl;
    private options: RequestOptions;
  
    constructor(
        private http: Http, 
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {  }

    private HeaderDefalt(): RequestOptions{
        let token = localStorage.getItem('token');        
        if(!token)
            this.router.navigateByUrl("Login");
        let options: RequestOptions;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        return  new RequestOptions({ headers: headers });        
    }

    GetFilter(path: string, data: any) {
        return this.http
            .get(this.serviceUrl + path + "/" + data, this.HeaderDefalt())
    }

    GetAll(path: string, skip: number, take:number) {  
        let params: string;
        if(skip > 0 && take > 0){
            params = "?page_size="+skip+"&page="+take; }        
        return this.http
            .get(this.serviceUrl + path + params, this.HeaderDefalt())
            .map((res: Response) => res.json());          
    }
    
    Find(path: string, text: string, skip: number, take:number) {  
        let params  = "?page_size="+skip+"&page="+take+'&text='+text;
        return this.http
            .get(this.serviceUrl + path + params, this.HeaderDefalt())
            .map((res: Response) => res.json());            
    }

    FindDetails(path: string, skip: number, take: number, text: string, doctorId: number, statusId: number ){
        let params  = "?page_size="+skip+"&page="+take+'&text='+text+'&doctorid='+doctorId+'&statusid'+statusId;
        return this.http
            .get(this.serviceUrl + path + params, this.HeaderDefalt())                      
    }   

    Post(path: string, data: any): Observable<any> {
        return this.http
            .post(this.serviceUrl + path,data, this.HeaderDefalt())           
    }

    Delete(path: string, id: number) {
        return this.http
            .delete(this.serviceUrl + path + "/" + id, this.HeaderDefalt())            
    }

    Put(path: string, data: any) {
        return this.http
            .put(this.serviceUrl + path, data, this.HeaderDefalt())
    }
}