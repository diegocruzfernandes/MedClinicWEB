import { Router } from '@angular/router';
import { SecretaryService } from './../secretaty.service';
import { Secretary } from './../secretary.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretary-list',
  templateUrl: './secretary-list.component.html',
  styleUrls: ['./secretary-list.component.css']
})
export class SecretaryListComponent implements OnInit {

  secretaries: Secretary[] =[];

  constructor(private secretaryService:SecretaryService, private router: Router ) { }

  ngOnInit() {
    this.secretaryService.getAllData(10,1).subscribe(
      s => this.secretaries = s,
      error => console.log('Error'+ error)
    )
  }

  Edit(id:number){
    console.log(id);
    this.router.navigate(['/secretary/form', id, 'editar']);
  }
  Delete(id:number){
    this.router.navigateByUrl("/secretary/form/"+id);
  }

}
