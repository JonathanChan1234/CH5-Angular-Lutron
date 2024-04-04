import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionsDialogComponent } from './select-options-dialog.component';

describe('SelectOptionsDialogComponent', () => {
  let component: SelectOptionsDialogComponent;
  let fixture: ComponentFixture<SelectOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
