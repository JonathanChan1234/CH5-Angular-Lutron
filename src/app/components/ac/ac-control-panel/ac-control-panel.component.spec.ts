import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcControlPanelComponent } from './ac-control-panel.component';

describe('AcControlPanelComponent', () => {
  let component: AcControlPanelComponent;
  let fixture: ComponentFixture<AcControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
