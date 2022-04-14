import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCardHeaderComponent } from './load-card-header.component';

describe('LoadCardHeaderComponent', () => {
  let component: LoadCardHeaderComponent;
  let fixture: ComponentFixture<LoadCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
