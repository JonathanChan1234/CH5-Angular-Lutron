import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvRemoteMobileComponent } from './av-remote-mobile.component';

describe('AvRemoteMobileComponent', () => {
  let component: AvRemoteMobileComponent;
  let fixture: ComponentFixture<AvRemoteMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvRemoteMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvRemoteMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
