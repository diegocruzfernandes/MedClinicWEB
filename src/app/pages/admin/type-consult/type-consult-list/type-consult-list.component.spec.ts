import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConsultListComponent } from './type-consult-list.component';

describe('TypeConsultListComponent', () => {
  let component: TypeConsultListComponent;
  let fixture: ComponentFixture<TypeConsultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeConsultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConsultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
