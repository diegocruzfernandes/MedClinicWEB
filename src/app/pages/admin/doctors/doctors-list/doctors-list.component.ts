import { Router } from '@angular/router';
import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'app/pages/admin/doctors/doctor.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  //doctors: Doctor[] = new Array<Doctor>();
  doctors: Doctor[] = [] ;

  constructor(private doctorService:DoctorService, private router:Router) { }

  ngOnInit() {
    this.doctorService.getAllData(10,1).subscribe(
      d => {this.doctors = d; console.log(this.doctors);} ,
      error => console.log('Error' + error)
    )
  }

  Edit(id:number){
    console.log(id);
    this.router.navigate(['/doctor/form', id, 'editar']);
  }
  Delete(id:number){
    this.router.navigateByUrl("/doctor/form/"+id);
  }

}
