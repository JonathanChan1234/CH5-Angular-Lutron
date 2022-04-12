import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneActionCreateComponent } from './scene-action-create.component';

describe('SceneActionCreateComponent', () => {
  let component: SceneActionCreateComponent;
  let fixture: ComponentFixture<SceneActionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneActionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneActionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
