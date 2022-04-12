import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLoadComponent } from './switch-load.component';

describe('SwitchLoadComponent', () => {
  let component: SwitchLoadComponent;
  let fixture: ComponentFixture<SwitchLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
