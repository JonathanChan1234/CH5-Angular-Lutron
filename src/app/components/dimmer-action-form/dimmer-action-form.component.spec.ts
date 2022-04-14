import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmerActionFormComponent } from './dimmer-action-form.component';

describe('DimmerActionFormComponent', () => {
  let component: DimmerActionFormComponent;
  let fixture: ComponentFixture<DimmerActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimmerActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmerActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
