import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryFormComponent } from './secretary-form.component';

describe('SecretaryFormComponent', () => {
  let component: SecretaryFormComponent;
  let fixture: ComponentFixture<SecretaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
