import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvDeviceComponent } from './av-device.component';

describe('AvDeviceComponent', () => {
  let component: AvDeviceComponent;
  let fixture: ComponentFixture<AvDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
