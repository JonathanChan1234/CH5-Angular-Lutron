import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import CrestronServiceStub from 'src/app/service/stub/crestron-service-stub';
import { SwitchLoadComponent } from './switch-load.component';

describe('SwitchLoadComponent', () => {
    let component: SwitchLoadComponent;
    let fixture: ComponentFixture<SwitchLoadComponent>;
    let loader: HarnessLoader;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SwitchLoadComponent],
            imports: [
                MatSlideToggleModule,
                MatCardModule,
                TranslateModule.forRoot(),
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
        fixture = TestBed.createComponent(SwitchLoadComponent);
        component = fixture.componentInstance;
        component.load = {
            id: 10,
            name: 'test',
            room: {
                id: 'testId',
                name: 'test room',
                devices: [],
            },
            type: 'switch',
        };
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should produce the right state', async () => {
        const toggle = await loader.getHarness(MatSlideToggleHarness);
        de = fixture.debugElement;
        el = de.nativeElement;
        const statusText = el.querySelector('.state-text');

        await toggle.check();
        expect(await toggle.isChecked()).toBe(true);
        expect(component.power).toBe(true);
        expect(statusText.textContent.trim()).toBe('room.on');
        await toggle.uncheck();
        expect(await toggle.isChecked()).toBe(false);
        expect(component.power).toBe(false);
        expect(statusText.textContent.trim()).toBe('room.off');
    });
});
