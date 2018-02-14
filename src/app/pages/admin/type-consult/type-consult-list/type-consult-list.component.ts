import { Router } from '@angular/router';
import { TypeConsultyService } from './../type-consult.service';
import { TypeConsult } from './../type-consult.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-consult-list',
  templateUrl: './type-consult-list.component.html',
  styleUrls: ['./type-consult-list.component.css']
})
export class TypeConsultListComponent implements OnInit {

  typeConsult: TypeConsult[] = [];

  constructor(private typeConsultService: TypeConsultyService, private router:Router) { }

  ngOnInit() {
    this.typeConsultService.getAllData(10,1).subscribe(
      t => this.typeConsult = t,
      error => console.log('Error'+ error)
    )
  }

  Edit(id:number){
    console.log(id);
    this.router.navigate(['/typeconsult/form', id, 'editar']);
  }
  Delete(id:number){
    this.router.navigateByUrl("/typeconsult/form/"+id);
  }

}
