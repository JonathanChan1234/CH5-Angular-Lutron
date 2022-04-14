import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageBarComponent } from './error-message-bar.component';

describe('ErrorMessageBarComponent', () => {
  let component: ErrorMessageBarComponent;
  let fixture: ComponentFixture<ErrorMessageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
