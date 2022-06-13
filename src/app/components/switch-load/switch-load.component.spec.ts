import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { SwitchLoadComponent } from './switch-load.component';

describe('SwitchLoadComponent', () => {
    let component: SwitchLoadComponent;
    let fixture: ComponentFixture<SwitchLoadComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SwitchLoadComponent],
            imports: [MatSlideToggleModule, TranslateModule.forRoot()],
            providers: [
                {
                    provide: CrestronService,
                    useValue: {
                        getLoadFbById: () => of(1),
                        askForLoadFb: () => {},
                    },
                },
            ],
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
            type: 'dimmer',
        };
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
