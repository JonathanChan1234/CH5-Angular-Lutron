import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Device } from 'src/app/model/device';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room/room.service';
import { RouterService } from 'src/app/service/router/router.service';
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

@Component({
    selector: 'app-error-message-bar',
})
class TestErrorMessageBarComponent {}

describe('RoomViewComponent (undefined room name)', () => {
    let component: RoomViewComponent;
    let fixture: ComponentFixture<RoomViewComponent>;
    let spyRouterService: jasmine.SpyObj<RouterService>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        spyRouterService = jasmine.createSpyObj<RouterService>(
            'RouterService',
            ['getCurrentRouteParams']
        );
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'getRoomLoadList',
        ]);
        TestBed.configureTestingModule({
            declarations: [
                RoomViewComponent,
                TestDimmerLoadComponent,
                TestSwitchLoadComponent,
                TestMotorLoadComponent,
                TestErrorMessageBarComponent,
            ],
            providers: [
                { provide: RoomService, useValue: spyRoomService },
                { provide: RouterService, useValue: spyRouterService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomViewComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should render error message bar', () => {
        const getCurrentRouteParams =
            spyRouterService.getCurrentRouteParams.and.returnValue({
                name: '',
            });
        fixture.detectChanges();
        const errMsgBar = debugElement.query(
            By.directive(TestErrorMessageBarComponent)
        );
        const pageTitle = debugElement.query(By.css('.page-title-container'));
        expect(getCurrentRouteParams).toHaveBeenCalled();
        expect(pageTitle)
            .withContext(
                'Page Title should not be rendered when the name is empty'
            )
            .toBeNull();
        expect(errMsgBar).toBeTruthy();
    });
});

describe('RoomViewComponent (no error)', () => {
    let component: RoomViewComponent;
    let fixture: ComponentFixture<RoomViewComponent>;
    let spyRouterService: jasmine.SpyObj<RouterService>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let debugElement: DebugElement;
    let getCurrentRouteParams: any;
    let getRoomLoadList: any;
    const testRoom: Room = {
        id: 'testId',
        name: 'Test Room',
        devices: [],
    };
    const loadList: Device[] = [
        { id: 1, name: 'Switch Load', room: testRoom, type: 'switch' },
        { id: 2, name: 'Dimmer Load', room: testRoom, type: 'dimmer' },
        { id: 3, name: 'Motor Load', room: testRoom, type: 'motor' },
    ];

    beforeEach(async(() => {
        // Initialize spy services for mocking
        spyRouterService = jasmine.createSpyObj<RouterService>(
            'RouterService',
            ['getCurrentRouteParams']
        );
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'getRoomLoadList',
        ]);
        getCurrentRouteParams =
            spyRouterService.getCurrentRouteParams.and.returnValue({
                name: 'test room',
            });
        const load$ = cold('--x|', { x: loadList });
        getRoomLoadList = spyRoomService.getRoomLoadList.and.returnValue(load$);

        TestBed.configureTestingModule({
            declarations: [
                RoomViewComponent,
                TestDimmerLoadComponent,
                TestSwitchLoadComponent,
                TestMotorLoadComponent,
                TestErrorMessageBarComponent,
            ],
            providers: [
                { provide: RoomService, useValue: spyRoomService },
                { provide: RouterService, useValue: spyRouterService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomViewComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should render room view', () => {
        const errMsgBar = debugElement.query(
            By.directive(TestErrorMessageBarComponent)
        );
        const roomView = debugElement.query(By.css('.room-view-container'));
        let loadingSpinner = debugElement.query(By.css('.loading-spinner'));

        // Check if the two functions are called during NgOnInit
        expect(getCurrentRouteParams)
            .withContext('Should call getCurrentRouterParams')
            .toHaveBeenCalled();
        expect(getRoomLoadList)
            .withContext('Should call getRoomLoadList')
            .toHaveBeenCalled();
        // Check if loading spinner exists
        expect(loadingSpinner).toBeTruthy();

        // flush to execute the queue
        getTestScheduler().flush();
        fixture.detectChanges();

        const deviceContainer = debugElement.queryAll(
            By.css('.device-container')
        );
        loadingSpinner = debugElement.query(By.css('.loading-spinner'));

        // check if the loading spinner and error message does not exist and the room view can be rendered
        expect(loadingSpinner).toBeNull();
        expect(roomView)
            .withContext('Should render the room view component')
            .toBeTruthy();
        expect(errMsgBar)
            .withContext('Should not render the error message bar')
            .toBeNull();

        // check the output of the device observable and render the correct child components
        expect(deviceContainer.length).toBe(3);
        expect(
            deviceContainer[0]?.query(By.directive(TestSwitchLoadComponent))
        ).toBeTruthy();
        expect(
            deviceContainer[1]?.query(By.directive(TestDimmerLoadComponent))
        ).toBeTruthy();
        expect(
            deviceContainer[2]?.query(By.directive(TestMotorLoadComponent))
        ).toBeTruthy();
    });
});

describe('RoomViewComponent (error)', () => {
    let component: RoomViewComponent;
    let fixture: ComponentFixture<RoomViewComponent>;
    let spyRouterService: jasmine.SpyObj<RouterService>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let debugElement: DebugElement;
    let getCurrentRouteParams: any;
    let getRoomLoadList: any;

    beforeEach(async(() => {
        // Initialize spy services for mocking
        spyRouterService = jasmine.createSpyObj<RouterService>(
            'RouterService',
            ['getCurrentRouteParams']
        );
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'getRoomLoadList',
        ]);
        getCurrentRouteParams =
            spyRouterService.getCurrentRouteParams.and.returnValue({
                name: 'test room',
            });
        const load$ = cold('--#|', null, new Error('Test Error'));
        getRoomLoadList = spyRoomService.getRoomLoadList.and.returnValue(load$);

        TestBed.configureTestingModule({
            declarations: [
                RoomViewComponent,
                TestDimmerLoadComponent,
                TestSwitchLoadComponent,
                TestMotorLoadComponent,
                TestErrorMessageBarComponent,
            ],
            providers: [
                { provide: RoomService, useValue: spyRoomService },
                { provide: RouterService, useValue: spyRouterService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomViewComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should render the error message bar', () => {
        let errMsgBar = debugElement.query(
            By.directive(TestErrorMessageBarComponent)
        );
        let loadingSpinner = debugElement.query(By.css('.loading-spinner'));

        // Check if loading spinner exists
        expect(loadingSpinner).toBeTruthy();

        // flush to execute the queue
        getTestScheduler().flush();
        fixture.detectChanges();

        const deviceContainer = debugElement.queryAll(
            By.css('.device-container')
        );
        errMsgBar = debugElement.query(
            By.directive(TestErrorMessageBarComponent)
        );

        loadingSpinner = debugElement.query(By.css('.loading-spinner'));

        // check the device$ would return empty array
        expect(deviceContainer.length).toBe(0);

        // check if the loading spinner and error message does not exist and the room view can be rendered
        expect(loadingSpinner).toBeNull();
        expect(errMsgBar).toBeTruthy();
    });
});
