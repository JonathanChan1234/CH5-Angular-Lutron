import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWithoutJoinComponent } from './modal-without-join.component';

describe('ModalWithoutJoinComponent', () => {
  let component: ModalWithoutJoinComponent;
  let fixture: ComponentFixture<ModalWithoutJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWithoutJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWithoutJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
