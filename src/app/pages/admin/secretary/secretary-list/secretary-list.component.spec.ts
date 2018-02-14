import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryListComponent } from './secretary-list.component';

describe('SecretaryListComponent', () => {
  let component: SecretaryListComponent;
  let fixture: ComponentFixture<SecretaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
