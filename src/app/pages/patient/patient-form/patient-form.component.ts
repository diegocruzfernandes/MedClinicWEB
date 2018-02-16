
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import { Patient } from './../patient.model';
import { PatientService } from 'app/pages/patient/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  public form: FormGroup;
  patient: Patient = new Patient();
  inscricao: Subscription;
  title: string = "Cadastrar Paciente";
  modeEdit: boolean = false;
  public mask = [ /\d/, /\d/,'/',/\d/,/\d/,'/',/\d/, /\d/, /\d/, /\d/];
  public errors: any[] = [];
  savedsuccess: boolean = false;
 
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      phonenumber: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      details: [null, Validators.compose([
        Validators.maxLength(255)
       
      ])],
      birthdate: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')

      ])],
      gender: [0],
      enabled: [true],
      id: [0]
    })
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        if (id != undefined || id <= 0) {
          this.patientService.getData(id).subscribe(
            (d: any) => {
              this.patient = d.json();
              this.form.controls['id'].setValue(this.patient.id);
              this.form.controls['name'].setValue(this.patient.name);
              this.form.controls['email'].setValue(this.patient.email);
              this.form.controls['phonenumber'].setValue(this.patient.phonenumber);
              this.form.controls['details'].setValue(this.patient.details);
              this.form.controls['birthdate'].setValue(this.convertDate(this.patient.birthdate));
              this.form.controls['gender'].setValue(this.patient.gender);
              this.form.controls['enabled'].setValue(this.patient.enabled);
              this.title = "Editar dados do Paciente";
              this.modeEdit = true;
              console.log(this.patient);
            },
            error => console.log('Error' + error)
          )
        };
      })
  }

  submit() {
    if (this.form.controls['id'].value <= 0)
      this.SaveNew();
    else
      this.Update();
  }

  SaveNew() {

    let value: any = {
      "name": this.form.controls['name'].value,
      "gender": this.form.controls['gender'].value,
      "email": this.form.controls['email'].value,
      "phonenumber": this.form.controls['phonenumber'].value,
      "details": this.form.controls['details'].value,
      "birthdate": this.form.controls['birthdate'].value,
      "enabled": this.form.controls['enabled'].value,
    };
    this.patientService.saveData(value)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  Update() {
    this.patient = this.form.value;
    this.patientService.updateData(this.patient)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  convertDate(date: Date){
    let dtf = date.toString();
    let dt = dtf.split('T');
    let d = dt[0];

    let b = d.split('-');
    return b[2] +'/'+ b[1] + '/' + b[0];
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}

