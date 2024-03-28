import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvCustomDpadComponent } from './av-custom-dpad.component';

describe('AvCustomDpadComponent', () => {
  let component: AvCustomDpadComponent;
  let fixture: ComponentFixture<AvCustomDpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvCustomDpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvCustomDpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
