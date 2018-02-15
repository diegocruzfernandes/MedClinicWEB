import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ScheduleService } from 'app/pages/schedule/schedule.service';
import { Schedule } from './../schedule.model';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
  providers: [ScheduleService]
})
export class ScheduleFormComponent implements OnInit {

  public form: FormGroup;
  schedule: Schedule = new Schedule();
  inscricao: Subscription;
  title: string = "Adicionar consulta Paciente";
  modeEdit: boolean = false;
  public mask = [ /\d/, /\d/,'/',/\d/,/\d/,'/',/\d/, /\d/, /\d/, /\d/,' ',/\d/, /\d/,':',/\d/, /\d/ ];
  public errors: any[] = [];
  savedsuccess: boolean = false;
  formEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
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
      doctor:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      typeconsult:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      status:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      initial: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(0[1-9]|1\d|2\d|3[01])/(0[1-9]|1\d|2\d|3[01])/(19|20)\d{2}\s+(0[1-9]|1[0-9]|2[0-3])\:(0[1-9]|[1-5][0-9])$')
      ])],
      finish: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(0[1-9]|1\d|2\d|3[01])/(0[1-9]|1\d|2\d|3[01])/(19|20)\d{2}\s+(0[1-9]|1[0-9]|2[0-3])\:(0[1-9]|[1-5][0-9])$')
      ])],
      typeConsultId: [0],
      statusId: [0]
    })
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.formEdit = params['edit'];
        if (id != undefined || id <= 0) {
          this.scheduleService.getData(id).subscribe(
            (d: any) => {
              this.schedule = d.json();
              this.form.controls['id'].setValue(this.schedule.id);
              this.form.controls['doctorid'].setValue(this.schedule.doctorid);
              this.form.controls['doctor'].setValue(this.schedule.doctor);
              this.form.controls['patient'].setValue(this.schedule.patient);
              this.form.controls['patientid'].setValue(this.schedule.patientid);
              this.form.controls['typeconsultid'].setValue(this.schedule.typeconsultid);
              this.form.controls['typeconsult'].setValue(this.schedule.typeconsult);
              this.form.controls['statusid'].setValue(this.schedule.statusid);
              this.form.controls['status'].setValue(this.schedule.status);
              this.form.controls['initial'].setValue(this.convertDate(this.schedule.initial));
              this.form.controls['finish'].setValue(this.convertDate(this.schedule.finish));
              this.title = "Editar dados do Paciente";
              this.modeEdit = true;
              console.log(this.schedule);
            },
            error => console.log('Error' + error)
          )
        };
      });
  }

  submit() {
    if (this.form.controls['id'].value <= 0)
      this.SaveNew();
    else
      this.Update();
  }

  SaveNew() {
    this.schedule = this.form.value;
    this.scheduleService.saveData(this.schedule)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  Update() {
    this.schedule = this.form.value;
    this.scheduleService.updateData(this.schedule)
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

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
