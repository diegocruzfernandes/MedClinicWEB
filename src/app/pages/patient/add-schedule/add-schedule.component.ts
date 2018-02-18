
import { DatePipe } from '@angular/common';
import { Patient } from './../patient.model';
import { FormatWidth } from '@angular/common';
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

import { dateTimeConvert } from 'app/shared/dateTimeConvert';
import { retry } from 'rxjs/operators/retry';
import { DateTools } from 'app/shared/dateTools';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  public form: FormGroup;
  schedules: Schedule = new Schedule();
  doctors: any;
  doctorSelect: any;
  typesConsult: any;
  typeConsultSelect: any;
  patient: Patient = new Patient();
  inscricao: Subscription;
  title: string = "Adicionar consulta Paciente";
  modeEdit: boolean = false;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
  public errors: any[] = [];
  savedsuccess: boolean = false;
  formEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private scheduleService: ScheduleService,
    private doctorService: DoctorService,
    private typeConsultService: TypeConsultyService,
    private router: Router,
    private fb: FormBuilder,
    private dataTool: DateTools
  ) {
    this.form = this.fb.group({
      id:[0],
      doctorId: [0,  Validators.required],
      patientId: [0,  Validators.required],
      patient: [''],      
      initial: ['', Validators.compose([Validators.required,  Validators.pattern("([1-9]|([012][0-9])|(3[01]))\\/([0]{0,1}[1-9]|1[012])\\/\\d\\d\\d\\d [012]{0,1}[0-9]:[0-6][0-9]")] )],
      finish: ['', Validators.compose([Validators.required,  Validators.pattern("([1-9]|([012][0-9])|(3[01]))\\/([0]{0,1}[1-9]|1[012])\\/\\d\\d\\d\\d [012]{0,1}[0-9]:[0-6][0-9]")] )],
      typeConsultId: [0,  Validators.required],
      statusId: [0, Validators.required]
    })
  }

  ngOnInit() {

    this.doctorService.getAllData(10, 1).subscribe(
      doctor =>this.doctors = doctor
    );
   
    this.typeConsultService.getAllData(10, 1).subscribe(
      typecons => this.typesConsult = typecons
    )

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.patientService.getData(id).subscribe(
          patient => {
            this.patient = patient.json();
            this.form.controls['patient'].setValue(this.patient.name);
            this.form.controls['patientId'].setValue(this.patient.id);
            this.form.controls['initial'].setValue(this.dataTool.DateJsonToDateBR(new Date()));
            this.form.controls['finish'].setValue(this.dataTool.DateJsonToDateBR(new Date()));
            console.log(this.dataTool.DateJsonToDateBR(new Date()));
          }, error => this.errors = <any>error
        )
      });
  }

  submit() {
    this.errors = null;

    let dateTmp=this.form.controls['initial'].value;
    this.form.controls['initial'].setValue(this.dataTool.StringToJsonDate(dateTmp));
    let dateTmp2=this.form.controls['finish'].value;
    this.form.controls['finish'].setValue(this.dataTool.StringToJsonDate(dateTmp2));
    
      this.SaveNew();
    
  }

  SaveNew() {
    this.schedules = this.form.value;
    this.scheduleService.saveData(this.schedules)
     .subscribe(
      res => {
        let list = res.json();
        if (list.success === true) {
          this.savedsuccess = true;
          this.errors = null;
          this.form.reset();
        } else {
          this.savedsuccess = false;
          this.errors = list.data;
        }
      },
      err => {
        console.log("ERROR->" + err);
      });      
  }

  Update() {
    this.schedules = this.form.value;
    this.scheduleService.updateData(this.schedules)
    .subscribe(
      res => {
        let list = res.json();
        if (list.success === true) {
          this.savedsuccess = true;
          this.errors = null;
          this.form.reset();
        } else {
          this.savedsuccess = false;
          this.errors = list.data;
        }
      },
      err => {
        console.log("ERROR->" + err);
      });      
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
