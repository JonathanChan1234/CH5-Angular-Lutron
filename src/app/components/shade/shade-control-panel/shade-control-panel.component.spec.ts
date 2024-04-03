import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeControlPanelComponent } from './shade-control-panel.component';

describe('ShadeControlPanelComponent', () => {
  let component: ShadeControlPanelComponent;
  let fixture: ComponentFixture<ShadeControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadeControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadeControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
