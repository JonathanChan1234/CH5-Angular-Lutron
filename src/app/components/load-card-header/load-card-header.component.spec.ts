import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Device } from 'src/app/model/device';
import { AppService } from 'src/app/service/app/app.service';
import { RoomService } from 'src/app/service/room/room.service';
import { LoadCardHeaderComponent } from './load-card-header.component';

describe('LoadCardHeaderComponent', () => {
    let component: LoadCardHeaderComponent;
    let fixture: ComponentFixture<LoadCardHeaderComponent>;
    let loader: HarnessLoader;
    let de: DebugElement;
    let el: HTMLElement;
    let spyRoomService: jasmine.SpyObj<RoomService>;
    let spyAppService: jasmine.SpyObj<AppService>;

    const load: Device = {
        id: 1,
        name: 'test',
        room: {
            id: 'test',
            name: 'test',
            devices: [],
        },
        type: 'switch',
    };

    beforeEach(async(() => {
        spyRoomService = jasmine.createSpyObj<RoomService>('RoomService', [
            'changeLoadName',
        ]);
        spyAppService = jasmine.createSpyObj('AppService', ['showSnackBarMsg']);
        TestBed.configureTestingModule({
            declarations: [LoadCardHeaderComponent],
            providers: [
                { provide: RoomService, useValue: spyRoomService },
                { provide: AppService, useValue: spyAppService },
            ],
            imports: [
                TranslateModule.forRoot(),
                MatInputModule,
                MatButtonModule,
                MatCardModule,
                NoopAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadCardHeaderComponent);
        component = fixture.componentInstance;
        component.load = load;
        component.editMode = false;
        component.nameFormControl = new FormControl(
            component.load.name,
            Validators.required
        );
        de = fixture.debugElement;
        el = de.nativeElement;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the right title and subtitle', () => {
        const matTitle = el.querySelector('.mat-card-title');
        expect(matTitle?.textContent).toBe(load.name);
        const matSubtitle = el.querySelector('.mat-card-subtitle');
        expect(matSubtitle?.textContent).toBe(
            `${('room.' + load.type).toUpperCase()} (Integration ID: ${
                load.id
            })`
        );
    });

    it('should render the correct icon', async () => {
        // switch icon
        let icon = de.query(By.css('.switch-icon'));
        expect(icon).toBeTruthy();

        // dimmer icon
        component.load.type = 'dimmer';
        fixture.detectChanges();
        icon = de.query(By.css('.dimmer-icon'));
        expect(icon).toBeTruthy();

        // motor icon
        component.load.type = 'motor';
        fixture.detectChanges();
        icon = de.query(By.css('.motor-icon'));
        expect(icon).toBeTruthy();
    });

    it('should change to edit mode', () => {
        const editIconButton = de.query(By.css('.edit-device-icon'));
        component.editMode = false;

        editIconButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const editDeviceForm = de.query(By.css('.edit-device-form'));
        expect(component.editMode).toBe(true);
        expect(editDeviceForm).toBeTruthy();
    });

    it('should show the error message', async () => {
        // initialize
        const changeLoadName = spyRoomService.changeLoadName.and.returnValue(
            throwError('error')
        );
        const showSnackBarMsg = spyAppService.showSnackBarMsg.and.returnValue();
        const newName = 'error name';
        component.editMode = true;
        fixture.detectChanges();
        const nameInputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        // change the device name and click the submit button
        await nameInputField.setValue(newName);
        await submitButton.click();
        fixture.detectChanges();

        // check the result
        expect(changeLoadName).toHaveBeenCalled();
        expect(component.editMode).toBe(false);
        expect(component.load.name).toBe(component.load.name);
        expect(showSnackBarMsg).toHaveBeenCalled();
    });

    it('should change the load name', async () => {
        // initialize
        const changeLoadName = spyRoomService.changeLoadName.and.returnValue(
            of({})
        );
        const showSnackBarMsg = spyAppService.showSnackBarMsg.and.returnValue();
        const newName = 'new name';
        component.editMode = true;
        fixture.detectChanges();
        const nameInputField = await loader.getHarness(MatInputHarness);
        const submitButton = await loader.getHarness(MatButtonHarness);

        // change the device name and click the submit button
        await nameInputField.setValue(newName);
        await submitButton.click();
        fixture.detectChanges();

        // check the result
        expect(changeLoadName).toHaveBeenCalled();
        expect(component.editMode).toBe(false);
        expect(component.load.name).toBe(newName);
        expect(showSnackBarMsg).toHaveBeenCalled();
    });
});
