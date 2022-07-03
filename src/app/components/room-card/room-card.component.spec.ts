import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { Room } from 'src/app/model/room';
import { AppService } from 'src/app/service/app/app.service';
import { RoomService } from 'src/app/service/room/room.service';
import { PAGE_ROOM_VIEW } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';

import { RoomCardComponent } from './room-card.component';

describe('RoomCardComponent', () => {
    let component: RoomCardComponent;
    let fixture: ComponentFixture<RoomCardComponent>;
    let debugElement: DebugElement;
    let loader: HarnessLoader;

    let spyRouter: jasmine.SpyObj<RouterService>;
    let spyAppService: jasmine.SpyObj<AppService>;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    const testRoom: Room = {
        id: 'testId',
        name: 'Test Room',
        devices: [],
    };

    beforeEach(async(() => {
        spyRouter = jasmine.createSpyObj<RouterService>('RouterService', [
            'navigate',
        ]);
        spyAppService = jasmine.createSpyObj<AppService>('AppService', [
            'showSnackBarMsg',
        ]);
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'changeRoomName',
        ]);
        TestBed.configureTestingModule({
            declarations: [RoomCardComponent],
            imports: [
                TranslateModule.forRoot(),
                MatInputModule,
                MatButtonModule,
                MatCardModule,
                FormsModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatIconModule,
            ],
            providers: [
                { provide: RouterService, useValue: spyRouter },
                { provide: AppService, useValue: spyAppService },
                { provide: RoomService, useValue: spyRoomService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomCardComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        component.room = testRoom;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        // reset editMode after test
        component.editMode = false;
        testRoom.name = 'Test Room';
        fixture.detectChanges();
    });

    it('should render the correct room information', () => {
        const roomCardTitle = debugElement.query(By.css('.room-card-title'));
        const roomDeviceSubtitle = debugElement.query(
            By.css('.room-device-subtitle')
        );
        expect(roomCardTitle?.nativeElement?.textContent).toBe(testRoom.name);
        expect(roomDeviceSubtitle?.nativeElement?.textContent).toBe(
            `${testRoom.devices.length} room.device`
        );
    });

    it('should change to edit mode when edit button is pressed', () => {
        const editButton = debugElement.query(By.css('.edit-icon-button'));
        editButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const editRoomForm = debugElement.query(By.css('.edit-room-form'));
        expect(component.editMode).toBeTrue();
        expect(editRoomForm).toBeTruthy();
    });

    it('should fail validation for invalid input', async () => {
        component.editMode = true;
        fixture.detectChanges();

        const inputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        await inputField.setValue('');
        expect(await submitButton.isDisabled()).toBeTrue();
    });

    it('should not change the name if the name is the same as before', async () => {
        // mock return value, should not be called
        const changeRoomName = spyRoomService.changeRoomName.and.returnValue(
            of({})
        );
        component.editMode = true;
        fixture.detectChanges();

        const inputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        await inputField.setValue(testRoom.name);
        expect(await submitButton.isDisabled()).toBeFalse();

        await submitButton.click();
        expect(component.editMode).toBeFalse();
        expect(changeRoomName).not.toHaveBeenCalled();
    });

    it('pass the validation but error occurs when calling changeRoomName', async () => {
        const error = new Error('test error');

        const error$ = cold('--#|', null, error);
        const changeRoomName =
            spyRoomService.changeRoomName.and.returnValue(error$);
        const showSnackBarMsg = spyAppService.showSnackBarMsg.and.returnValue();

        component.editMode = true;
        fixture.detectChanges();

        const inputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        const newName = 'New Test Room';
        await inputField.setValue(newName);
        expect(await submitButton.isDisabled()).toBeFalse();

        await submitButton.click();
        expect(changeRoomName).toHaveBeenCalledWith(testRoom.id, newName);

        getTestScheduler().flush();
        fixture.detectChanges();

        expect(component.editMode).toBe(false);
        expect(await inputField.getValue()).toBe(testRoom.name);
        expect(showSnackBarMsg).toHaveBeenCalledWith({
            msg: 'test error',
            type: 'error',
        });
    });

    it('pass the validation and changeRoomName is successful', async () => {
        const result = {};
        const result$ = cold('--x|', { x: result });
        const changeRoomName =
            spyRoomService.changeRoomName.and.returnValue(result$);
        const showSnackBarMsg = spyAppService.showSnackBarMsg.and.returnValue();

        component.editMode = true;
        fixture.detectChanges();

        const inputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        const newName = 'New Test Room';
        await inputField.setValue(newName);
        expect(await submitButton.isDisabled()).toBeFalse();

        await submitButton.click();
        expect(changeRoomName).toHaveBeenCalledWith(testRoom.id, newName);

        getTestScheduler().flush();
        fixture.detectChanges();

        expect(component.editMode).toBe(false);
        expect(await inputField.getValue()).toBe(newName);
        expect(showSnackBarMsg).toHaveBeenCalledWith({
            msg: 'room.changeRoomMessage',
            type: 'success',
        });
    });

    it('should navigate to the room view', () => {
        const navgiate = spyRouter.navigate.and.returnValue();
        const roomCard = debugElement.query(By.css('.room-card'));
        roomCard.triggerEventHandler('click', null);
        expect(navgiate).toHaveBeenCalledWith(PAGE_ROOM_VIEW, {
            name: testRoom.name,
        });
    });
});
