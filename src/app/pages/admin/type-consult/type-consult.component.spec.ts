import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConsultComponent } from './type-consult.component';

describe('TypeConsultComponent', () => {
  let component: TypeConsultComponent;
  let fixture: ComponentFixture<TypeConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
