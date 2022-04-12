import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorLoadComponent } from './motor-load.component';

describe('MotorLoadComponent', () => {
  let component: MotorLoadComponent;
  let fixture: ComponentFixture<MotorLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
