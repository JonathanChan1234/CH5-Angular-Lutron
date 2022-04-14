import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchActionFormComponent } from './switch-action-form.component';

describe('SwitchActionFormComponent', () => {
  let component: SwitchActionFormComponent;
  let fixture: ComponentFixture<SwitchActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
