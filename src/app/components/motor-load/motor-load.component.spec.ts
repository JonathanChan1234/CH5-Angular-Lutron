import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import CrestronServiceStub from 'src/app/service/crestron/crestron-service-stub';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { MotorLoadComponent } from './motor-load.component';

describe('MotorLoadComponent', () => {
    let component: MotorLoadComponent;
    let fixture: ComponentFixture<MotorLoadComponent>;
    let loader: HarnessLoader;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
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
                    useValue: new CrestronServiceStub(),
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

    it('should set motor action', async () => {
        const motorRaiseButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-raise-button' })
        );
        await motorRaiseButton.click();
        expect(motorRaiseButton).toBeTruthy();
        const motorStopButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-stop-button' })
        );
        await motorStopButton.click();
        expect(motorStopButton).toBeTruthy();
        const motorLowerButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#motor-lower-button' })
        );
        await motorLowerButton.click();
        expect(motorLowerButton).toBeTruthy();
    });
});
