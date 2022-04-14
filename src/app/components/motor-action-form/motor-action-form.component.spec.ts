import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorActionFormComponent } from './motor-action-form.component';

describe('MotorActionFormComponent', () => {
  let component: MotorActionFormComponent;
  let fixture: ComponentFixture<MotorActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
