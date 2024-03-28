import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvRemoteComponent } from './av-remote.component';

describe('AvRemoteComponent', () => {
  let component: AvRemoteComponent;
  let fixture: ComponentFixture<AvRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
