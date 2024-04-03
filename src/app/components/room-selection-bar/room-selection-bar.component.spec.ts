import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSelectionBarComponent } from './room-selection-bar.component';

describe('RoomSelectionBarComponent', () => {
  let component: RoomSelectionBarComponent;
  let fixture: ComponentFixture<RoomSelectionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSelectionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelectionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
