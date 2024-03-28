import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvRemotePortraitComponent } from './av-remote-portrait.component';

describe('AvRemotePortraitComponent', () => {
  let component: AvRemotePortraitComponent;
  let fixture: ComponentFixture<AvRemotePortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvRemotePortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvRemotePortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
