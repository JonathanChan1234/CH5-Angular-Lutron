import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatSliderModule } from '@angular/material/slider';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { TranslateModule } from '@ngx-translate/core';
import CrestronServiceStub from 'src/app/service/crestron/crestron-service-stub';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { DimmerLoadComponent } from './dimmer-load.component';

describe('DimmerLoadComponent', () => {
    let component: DimmerLoadComponent;
    let fixture: ComponentFixture<DimmerLoadComponent>;
    let loader: HarnessLoader;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DimmerLoadComponent],
            imports: [
                TranslateModule.forRoot(),
                MatSlideToggleModule,
                MatSliderModule,
                MatCardModule,
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
        fixture = TestBed.createComponent(DimmerLoadComponent);
        component = fixture.componentInstance;
        component.load = {
            id: 10,
            name: 'test',
            room: {
                id: 'testId',
                name: 'test room',
                devices: [],
            },
            type: 'dimmer',
        };
        loader = TestbedHarnessEnvironment.loader(fixture);
        de = fixture.debugElement;
        el = de.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check the toggle switch', async () => {
        const toggle = await loader.getHarness(MatSlideToggleHarness);
        const levelText = el.querySelector('.valueText');

        // check the toggle slider
        await toggle.check();
        expect(component.level).toBe(100);
        expect(levelText.textContent).toBe('100%');
    });

    it('uncheck the toggle switch', async () => {
        const toggle = await loader.getHarness(MatSlideToggleHarness);
        const levelText = el.querySelector('.valueText');

        // uncheck the toggle slider
        await toggle.uncheck();
        expect(component.level).toBe(0);
        expect(levelText.textContent).toBe('0%');
    });

    it('set the slider to 50%', async () => {
        const toggle = await loader.getHarness(MatSlideToggleHarness);
        const slider = await loader.getHarness(MatSliderHarness);
        const levelText = el.querySelector('.valueText');

        // uncheck the toggle slider
        await slider.setValue(50);
        expect(component.level).toBe(50);
        expect(await toggle.isChecked()).toBe(true);
        expect(levelText.textContent).toBe('50%');
    });

    it('set the slider to 0%', async () => {
        const toggle = await loader.getHarness(MatSlideToggleHarness);
        const slider = await loader.getHarness(MatSliderHarness);
        const levelText = el.querySelector('.valueText');

        // uncheck the toggle slider
        await slider.setValue(0);
        expect(component.level).toBe(0);
        expect(await toggle.isChecked()).toBe(false);
        expect(levelText.textContent).toBe('0%');
    });
});
