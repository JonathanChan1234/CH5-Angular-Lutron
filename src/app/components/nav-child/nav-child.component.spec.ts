import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { PAGE_SCENE_TABLE } from 'src/app/service/router/route';
import {
    BottomNavigation,
    RouteInfo,
    RouterService,
} from 'src/app/service/router/router.service';

import { NavChildComponent } from './nav-child.component';

describe('NavChildComponent', () => {
    let component: NavChildComponent;
    let fixture: ComponentFixture<NavChildComponent>;
    let debugElement: DebugElement;

    let getCurrentSelection: any;
    let getCurrentRoute: any;
    let navigate: any;
    let changeSelection: any;

    const label = 'test label';
    const icon = 'test icon';
    const route: BottomNavigation = PAGE_SCENE_TABLE;

    const currentSelection$ = new BehaviorSubject<BottomNavigation>(
        PAGE_SCENE_TABLE
    );
    const route$ = new BehaviorSubject<RouteInfo>({
        path: PAGE_SCENE_TABLE,
        params: null,
    });

    beforeEach(async(() => {
        const spyRouterService = jasmine.createSpyObj<RouterService>(
            'RouterService',
            [
                'getCurrentRoute',
                'navigate',
                'getCurrentSelection',
                'changeSelection',
            ]
        );
        getCurrentSelection =
            spyRouterService.getCurrentSelection.and.returnValue(
                currentSelection$
            );
        getCurrentRoute =
            spyRouterService.getCurrentRoute.and.returnValue(route$);
        navigate = spyRouterService.navigate.and.returnValue();
        changeSelection = spyRouterService.changeSelection.and.returnValue();

        TestBed.configureTestingModule({
            declarations: [NavChildComponent],
            imports: [TranslateModule.forRoot(), MatIconModule],
            providers: [
                {
                    provide: RouterService,
                    useValue: spyRouterService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavChildComponent);
        debugElement = fixture.debugElement;
        component = fixture.componentInstance;

        component.label = label;
        component.icon = icon;
        component.route = route;
        fixture.detectChanges();
    });

    it('should render the right UI', () => {
        expect(component).toBeTruthy();
        // check the text
        expect(getNavChildText().nativeElement.textContent).toBe(label);

        // check if navigate is called
        getNavChild().triggerEventHandler('click', null);
        expect(navigate).toHaveBeenCalled();
        expect(changeSelection).toHaveBeenCalled();

        // check if the component has the selected class
        expect(getNavChild().classes).toEqual({
            'page-nav-child': true,
            'page-nav-child-selected': true,
        });

        // check if the component has the selected class after route change
        currentSelection$.next('room_panel');
        fixture.detectChanges();
        expect(getNavChild().classes).toEqual({
            'page-nav-child': true,
        });
    });

    const getNavChildText = () => {
        return debugElement.query(By.css('.nav-child-text'));
    };

    const getNavChild = () => {
        return debugElement.query(By.css('.page-nav-child'));
    };
});
