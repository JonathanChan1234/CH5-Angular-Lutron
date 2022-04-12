import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsPanelComponent } from './rooms-panel.component';

describe('RoomsPanelComponent', () => {
  let component: RoomsPanelComponent;
  let fixture: ComponentFixture<RoomsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
