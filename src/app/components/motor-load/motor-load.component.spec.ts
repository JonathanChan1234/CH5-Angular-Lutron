import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { MotorLoadComponent } from './motor-load.component';

describe('MotorLoadComponent', () => {
    let component: MotorLoadComponent;
    let fixture: ComponentFixture<MotorLoadComponent>;
    let loader: HarnessLoader;
    let spyCrestronService: jasmine.SpyObj<CrestronService>;

    beforeEach(async(() => {
        spyCrestronService = jasmine.createSpyObj<CrestronService>(
            'CrestronService',
            ['setMotorAction']
        );
        TestBed.configureTestingModule({
            declarations: [MotorLoadComponent],
            imports: [
                TranslateModule.forRoot(),
                MatCardModule,
                MatButtonModule,
                MatIconModule,
            ],
            providers: [
                {
                    provide: CrestronService,
                    useValue: spyCrestronService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MotorLoadComponent);
        component = fixture.componentInstance;
        component.load = {
            id: 10,
            name: 'test',
            room: {
                id: 'testId',
                name: 'test room',
                devices: [],
            },
            type: 'motor',
        };
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should raise motor action', async () => {
        const setMotorAction =
            spyCrestronService.setMotorAction.and.returnValue();
        const motorRaiseButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-raise-button' })
        );

        // raise
        await motorRaiseButton.click();
        expect(setMotorAction).toHaveBeenCalled();
    });

    it('should stop the motor action', async () => {
        const setMotorAction =
            spyCrestronService.setMotorAction.and.returnValue();

        // stop
        const motorStopButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-stop-button' })
        );
        await motorStopButton.click();
        expect(setMotorAction).toHaveBeenCalled();
    });

    it('should lower the motor action', async () => {
        const setMotorAction =
            spyCrestronService.setMotorAction.and.returnValue();

        // lower
        const motorLowerButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-lower-button' })
        );
        await motorLowerButton.click();
        expect(setMotorAction).toHaveBeenCalled();
    });
});
