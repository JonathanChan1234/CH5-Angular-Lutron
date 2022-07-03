import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessageBarComponent } from './error-message-bar.component';

describe('ErrorMessageBarComponent', () => {
    let component: ErrorMessageBarComponent;
    let fixture: ComponentFixture<ErrorMessageBarComponent>;
    let loader: HarnessLoader;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorMessageBarComponent],
            imports: [MatButtonModule],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorMessageBarComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });

    it('should render correctly', async () => {
        let backPressCalled = false;
        component.back.subscribe(() => {
            backPressCalled = true;
        });

        const message = 'Test Error Message';
        component.message = message;
        fixture.detectChanges();

        // should render
        expect(component).toBeTruthy();

        // should render the error text
        const errorText = debugElement.query(By.css('.warning-header-text'));
        expect(errorText.nativeElement.textContent).toBe(message);

        // "back" event emitter should emit
        const backButton = await loader.getHarness(MatButtonHarness);
        await backButton.click();
        expect(backPressCalled).toBeTrue();
    });
});
