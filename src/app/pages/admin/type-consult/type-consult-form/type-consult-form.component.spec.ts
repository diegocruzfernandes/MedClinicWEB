import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConsultFormComponent } from './type-consult-form.component';

describe('TypeConsultFormComponent', () => {
  let component: TypeConsultFormComponent;
  let fixture: ComponentFixture<TypeConsultFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeConsultFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConsultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
