import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BottomNavigation } from 'src/app/service/router/router.service';

import { NavBarComponent } from './nav-bar.component';

@Component({
    selector: 'app-nav-child',
})
class TestNavChildComponent {
    @Input() route: BottomNavigation;
    @Input() label: string;
    @Input() icon: string;
}

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavBarComponent, TestNavChildComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        const navChildren = fixture.debugElement.queryAll(
            By.directive(TestNavChildComponent)
        );
        console.log(navChildren.length);
    });
});
