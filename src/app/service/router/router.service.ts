import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PAGE_ROOMS_PANEL, PAGE_SCENE_TABLE, PAGE_SETTING } from './route';

export type RouteInfo = {
    path: string;
    params: any;
};

export type BottomNavigation =
    | typeof PAGE_ROOMS_PANEL
    | typeof PAGE_SCENE_TABLE
    | typeof PAGE_SETTING;

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    readonly DEFAULT_ROUTE: BottomNavigation = PAGE_SCENE_TABLE;
    route$ = new BehaviorSubject<RouteInfo>({
        path: this.DEFAULT_ROUTE,
        params: null,
    });

    private currentSelection$ = new BehaviorSubject<BottomNavigation>(
        this.DEFAULT_ROUTE
    );

    constructor() {}

    navigate(path: string, params?: any) {
        this.route$.next({ path, params });
    }

    getCurrentRoute() {
        return this.route$;
    }

    getCurrentRouteParams() {
        return this.route$.getValue().params;
    }

    getCurrentSelection() {
        return this.currentSelection$;
    }

    changeSelection(selection: BottomNavigation) {
        this.currentSelection$.next(selection);
    }
}
