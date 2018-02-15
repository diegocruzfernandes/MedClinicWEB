import { TypeConsultyService } from './../type-consult.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TypeConsult } from './../type-consult.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-consult-form',
  templateUrl: './type-consult-form.component.html',
  styleUrls: ['./type-consult-form.component.css']
})
export class TypeConsultFormComponent implements OnInit {

  public form: FormGroup;
  typeConsult: TypeConsult = new TypeConsult();
  inscricao: Subscription;
  title: string = "Cadastrar Tipo de Consulta";
  modeEdit: boolean = false;
  public errors: any[] = [];
  savedsuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private typeConsultService: TypeConsultyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      enabled: [true],
      id: [0]
    })
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        if (id != undefined || id <= 0) {
          this.typeConsultService.getData(id).subscribe(
            (d: any) => {
              this.typeConsult = d.json();
              this.form.controls['id'].setValue(this.typeConsult.id);
              this.form.controls['name'].setValue(this.typeConsult.name);
              this.form.controls['description'].setValue(this.typeConsult.description);
              this.form.controls['enabled'].setValue(this.typeConsult.enabled);
              this.title = "Editar dados Tipo de Consultas";
              this.modeEdit = true;
              console.log(this.typeConsult);
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
    this.typeConsult = this.form.value;
    this.typeConsultService.saveData(this.typeConsult)
      .subscribe(
      res => {
        this.savedsuccess = true;
        this.form.reset();
      },
      err => { this.errors = err; }
      );
  }

  Update() {
    this.typeConsult = this.form.value;
    this.typeConsultService.updateData(this.typeConsult)
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
