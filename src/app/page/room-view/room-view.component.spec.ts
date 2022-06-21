import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomViewComponent } from './room-view.component';

@Component({
    selector: 'app-dimmer-load',
})
class TestDimmerLoadComponent {}

@Component({
    selector: 'app-switch-load',
})
class TestSwitchLoadComponent {}

@Component({
    selector: 'app-motor-load',
})
class TestMotorLoadComponent {}

describe('RoomViewComponent', () => {
    let component: RoomViewComponent;
    let fixture: ComponentFixture<RoomViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RoomViewComponent,
                TestDimmerLoadComponent,
                TestSwitchLoadComponent,
                TestMotorLoadComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
