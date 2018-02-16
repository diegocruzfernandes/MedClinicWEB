import { DatePipe } from '@angular/common';
import { Patient } from './../patient.model';
import { PatientService } from 'app/pages/patient/patient.service';

import { Doctor } from 'app/pages/admin/doctors/doctor.model';
import { TypeConsultyService } from './../../admin/type-consult/type-consult.service';
import { DoctorService } from './../../admin/doctors/doctor.service';
import { ScheduleService } from './../../schedule/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Schedule } from './../../schedule/schedule.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TypeConsult } from 'app/pages/admin/type-consult/type-consult.model';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  public form: FormGroup;
  schedules: Schedule = new Schedule();
  doctors: Doctor = new Doctor();
  typesConsult: TypeConsult = new TypeConsult();
  patient: Patient = new Patient();
  inscricao: Subscription;
  title: string = "Adicionar consulta Paciente";
  modeEdit: boolean = false;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
  public errors: any[] = [];
  savedsuccess: boolean = false;
  formEdit: boolean = false;
  datePipe = new DatePipe('en-US');

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private scheduleService: ScheduleService,
    private doctorService: DoctorService,
    private typeConsultService: TypeConsultyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      doctorId: [0],
      patientId: [0],
      patient: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      doctor: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      typeconsult: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      status: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      initial: [this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm'), Validators.compose([
        Validators.required,
        Validators.pattern('/^d{1,2}\.\d{1,2}\.\d{4}$/')
      ])],
      finish: [this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm'), Validators.compose([
        Validators.required,
        Validators.pattern('([1-9]|([012][0-9])|(3[01]))/([0]{0,1}[1-9]|1[012])/\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]')
      ])],
      typeConsultId: [0],
      statusId: [0]
    })
  }

  ngOnInit() {

    this.doctorService.getAllData(10, 1).subscribe(
      doctor => this.doctors = doctor
    );

    this.typeConsultService.getAllData(10, 1).subscribe(
      typecons => this.patientService = typecons
    )

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.patientService.getData(id).subscribe(
          patient => {
            this.patient = patient.json();
            this.form.controls['patient'].setValue(this.patient.name);
          }, error => this.errors = <any>error
        )
      });


  }

  submit() {
    if (this.form.controls['id'].value <= 0)
      this.SaveNew();
    else
      this.Update();
  }

  SaveNew() {
    this.schedules = this.form.value;
    this.scheduleService.saveData(this.schedules)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  Update() {
    this.schedules = this.form.value;
    this.scheduleService.updateData(this.schedules)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  convertDate(date: Date) {
    let dtf = date.toString();
    let dt = dtf.split('T');
    let d = dt[0];

    let b = d.split('-');
    return b[2] + '/' + b[1] + '/' + b[0];

  }

  onChange(control, value) {
    this.form.controls[control].setValue = value;
    console.log(control + '-' + value);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
