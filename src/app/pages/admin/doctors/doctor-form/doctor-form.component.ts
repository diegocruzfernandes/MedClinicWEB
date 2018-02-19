import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { matchOtherValidator } from 'app/validations/matchOtherValidator';
import { DoctorService } from './../doctor.service';
import { Doctor } from 'app/pages/admin/doctors/doctor.model';

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
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      nickname: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        matchOtherValidator('password'),
        Validators.required
      ])],
      userid: [0],
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
    this.errors = null;
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
    this.doctor = this.form.value;
    this.doctorService.updateData(this.doctor)
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
