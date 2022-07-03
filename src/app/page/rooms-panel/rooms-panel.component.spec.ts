import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room/room.service';

import { RoomsPanelComponent } from './rooms-panel.component';

@Component({
    selector: 'app-room-card',
})
class TestRoomCardComponent {}

@Component({
    selector: 'app-error-message-bar',
})
class TestErrorMessageBarComponent {}
const roomList: Room[] = [
    { id: '1', name: 'Test Room 1', devices: [] },
    { id: '2', name: 'Test Room 2', devices: [] },
    { id: '3', name: 'Test Room 3', devices: [] },
];

describe('RoomsPanelComponent (no error)', () => {
    let component: RoomsPanelComponent;
    let fixture: ComponentFixture<RoomsPanelComponent>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let debugElement: DebugElement;
    let loader: HarnessLoader;

    let getRoomList: any;

    beforeEach(async(() => {
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'getRoomList',
        ]);
        const room$ = cold('--x|', { x: roomList });
        const refreshRoom$ = cold('--x|', { x: [] });
        getRoomList = spyRoomService.getRoomList.and.returnValues(
            room$,
            refreshRoom$
        );

        TestBed.configureTestingModule({
            declarations: [
                RoomsPanelComponent,
                TestRoomCardComponent,
                TestErrorMessageBarComponent,
            ],
            imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
            providers: [
                {
                    provide: RoomService,
                    useValue: spyRoomService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomsPanelComponent);
        debugElement = fixture.debugElement;
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should render the room card container and loading spinner together when refreshing', async () => {
        // 1. fetching room information (loading state)
        // 2. finish fetching and render room cards
        // 3. click the refresh button
        // 4. refreshing
        // 5. (refresh completed) render new room cards

        // (1)
        let loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).toBeTruthy();

        // (2)
        getTestScheduler().run((helper) => {
            helper.flush();
        });
        fixture.detectChanges();

        expect(getRoomList).toHaveBeenCalled();
        let roomCardContainer = debugElement.query(
            By.css('.room-card-container')
        );

        let errorMessageContainer = debugElement.query(
            By.css('.error-message-container')
        );
        expect(errorMessageContainer).toBeNull();

        expect(roomCardContainer).toBeTruthy();
        const refreshButton = await loader.getHarness(MatButtonHarness);
        expect(refreshButton).toBeTruthy();

        getTestScheduler().flush();
        fixture.detectChanges();
        let roomCards = debugElement.queryAll(By.css('.room-card'));
        expect(roomCards.length).toBe(3);

        // (3)
        await refreshButton.click();
        fixture.detectChanges();

        // (4)
        loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).toBeTruthy();
        roomCardContainer = debugElement.query(By.css('.room-card-container'));
        expect(roomCardContainer).toBeTruthy();
        roomCards = debugElement.queryAll(By.css('.room-card'));
        expect(roomCards.length).toBe(3);
        errorMessageContainer = debugElement.query(
            By.css('.error-message-container')
        );
        expect(errorMessageContainer).not.toBeTruthy();

        // (5)
        getTestScheduler().flush();
        fixture.detectChanges();
        loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).not.toBeTruthy();
        roomCardContainer = debugElement.query(By.css('.room-card-container'));
        expect(roomCardContainer).toBeTruthy();
        roomCards = debugElement.queryAll(By.css('.room-card'));
        expect(roomCards.length).toBe(0);
        errorMessageContainer = debugElement.query(
            By.css('.error-message-container')
        );
        expect(errorMessageContainer).not.toBeTruthy();
    });
});

describe('RoomsPanelComponent (error)', () => {
    let component: RoomsPanelComponent;
    let fixture: ComponentFixture<RoomsPanelComponent>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let debugElement: DebugElement;
    let loader: HarnessLoader;
    let getRoomList: any;

    beforeEach(async(() => {
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'getRoomList',
        ]);
        const error$ = cold('--#|', null, new Error('Room Service Error'));
        const rooms$ = cold('--x|', { x: roomList });
        getRoomList = spyRoomService.getRoomList.and.returnValues(
            error$,
            rooms$
        );

        TestBed.configureTestingModule({
            declarations: [
                RoomsPanelComponent,
                TestRoomCardComponent,
                TestErrorMessageBarComponent,
            ],
            imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
            providers: [
                {
                    provide: RoomService,
                    useValue: spyRoomService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomsPanelComponent);
        debugElement = fixture.debugElement;
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should render error message bar', async () => {
        // 1. refreshing
        // 2. render error message bar in the first emission
        // 3. click the refresh button
        // 4. refreshing
        // 5. render the room cards (no error in the second emisssion)

        // (1)
        fixture.detectChanges();
        // loading state
        let loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).toBeTruthy();

        // (2) flush the queue
        getTestScheduler().flush();
        fixture.detectChanges();

        expect(getRoomList).toHaveBeenCalled();
        loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).not.toBeTruthy();
        const roomCardContainer = debugElement.query(
            By.css('.room-card-container')
        );
        expect(roomCardContainer).not.toBeTruthy();
        const errorMessageContainer = debugElement.query(
            By.css('.error-message-container')
        );
        expect(errorMessageContainer).toBeTruthy();

        // (3)
        let refreshButton = await loader.getHarness(MatButtonHarness);
        await refreshButton.click();
        fixture.detectChanges();

        // (4)
        try {
            refreshButton = await loader.getHarness(MatButtonHarness);
            expect(refreshButton).not.toBeTruthy();
        } catch (error) {
            expect(error).toBeTruthy();
        }
        loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).toBeTruthy();

        // (5)
        getTestScheduler().flush();
        fixture.detectChanges();

        loadingSpinner = debugElement.query(By.css('.loading-spinner'));
        expect(loadingSpinner).not.toBeTruthy();
        const roomCards = debugElement.queryAll(By.css('.room-card'));
        expect(roomCards.length).toBe(3);
    });
});
