import { matchOtherValidator } from 'app/validations/matchOtherValidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SecretaryService } from 'app/pages/admin/secretary/secretaty.service';
import { Secretary } from './../secretary.model';

@Component({
  selector: 'app-secretary-form',
  templateUrl: './secretary-form.component.html',
  styleUrls: ['./secretary-form.component.css']
})
export class SecretaryFormComponent implements OnInit {

  public form: FormGroup;
  secretary: Secretary = new Secretary();
  inscricao: Subscription;
  title: string = "Cadastrar Secretário";
  modeEdit: boolean = false;
  public errors: any;
  savedsuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private secretaryService: SecretaryService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      document: ['', Validators.compose([
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
          this.secretaryService.getData(id).subscribe(
            (d:any) => {
              this.secretary = d.json();
              this.form.controls['id'].setValue(this.secretary.id);
              this.form.controls['userid'].setValue(this.secretary.userid);
              this.form.controls['name'].setValue(this.secretary.name);
              this.form.controls['document'].setValue(this.secretary.document);            
              this.form.controls['email'].setValue(this.secretary.email);
              this.form.controls['nickname'].setValue(this.secretary.nickname);
              this.form.controls['enabled'].setValue(this.secretary.enabled);
              this.title = "Editar dados do Secretário";
              this.modeEdit = true;
              console.log(this.secretary);
            },
            error => console.log('Error' + error)
          )
        };
      })
  }
  submit() {
    this.errors = null;
    if (this.form.controls['id'].value <= 0)
      this.SaveNew();
    else      
      this.Update();
  }

  SaveNew() {
    this.secretary = this.form.value;
    this.secretaryService.saveData(this.secretary)
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
    this.secretary = this.form.value;
    this.secretaryService.updateData(this.secretary)
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