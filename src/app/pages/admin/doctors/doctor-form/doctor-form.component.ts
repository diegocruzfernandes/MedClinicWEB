import { DoctorService } from './../doctor.service';
import { Doctor } from 'app/pages/admin/doctors/doctor.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {

  public form: FormGroup;
  doctor: Doctor = new Doctor();
  inscricao: Subscription;
  title: string = "Cadastrar Médico";
  modeEdit: boolean = false;
  public errors: any[] = [];
  savedsuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      specialty: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      codeRegister: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      nickname: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      userid: [0],
      permission: [0, Validators.required],
      enabled: [true],
      id: [0]
    })
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        if (id != undefined || id <= 0) {
          this.doctorService.getData(id).subscribe(
            (d: any) => {
              this.doctor = d.json();
              this.form.controls['id'].setValue(this.doctor.id);
              this.form.controls['userid'].setValue(this.doctor.userid);
              this.form.controls['name'].setValue(this.doctor.name);
              this.form.controls['specialty'].setValue(this.doctor.specialty);
              this.form.controls['codeRegister'].setValue(this.doctor.codeRegister);
              this.form.controls['email'].setValue(this.doctor.email);
              this.form.controls['nickname'].setValue(this.doctor.nickname);
              this.form.controls['permission'].setValue(this.doctor.permission);
              this.form.controls['enabled'].setValue(this.doctor.enabled);
              this.title = "Editar dados do Médico";
              this.modeEdit = true;
            },
            error => console.log('Error' + error)
          )
        };
      })
  }

  submit() {
    if (this.doctor.id <= 0 || this.doctor.id == undefined)
      this.SaveNew();
    else      
      this.Update();
  }

  SaveNew() {
    this.doctor = this.form.value;
    console.log(this.doctor);
    this.doctorService.saveData(this.doctor)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  Update() {
    this.doctor = this.form.value;
    this.doctorService.updateData(this.doctor)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
