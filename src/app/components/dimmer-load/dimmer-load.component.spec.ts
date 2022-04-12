import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmerLoadComponent } from './dimmer-load.component';

describe('DimmerLoadComponent', () => {
  let component: DimmerLoadComponent;
  let fixture: ComponentFixture<DimmerLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimmerLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmerLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
