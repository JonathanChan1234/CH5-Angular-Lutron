import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    PAGE_AC_CONTROL,
    PAGE_AV_REMOTE,
    PAGE_DEVICE_OVERVIEW,
    PAGE_LIGHTING,
    PAGE_ROOMS_PANEL,
    PAGE_SCENE_TABLE,
    PAGE_SETTING,
    PAGE_SHADE,
    Route,
} from './route';

export type RouteInfo = {
    route: Route;
    params?: any;
};

export type BottomNavigation =
    | typeof PAGE_ROOMS_PANEL
    | typeof PAGE_SCENE_TABLE
    | typeof PAGE_SETTING
    | typeof PAGE_AV_REMOTE
    | typeof PAGE_AC_CONTROL
    | typeof PAGE_SHADE
    | typeof PAGE_LIGHTING
    | typeof PAGE_DEVICE_OVERVIEW;

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    private readonly DEFAULT_ROUTE: Route = Route.DEVICE_OVERVIEW;
    route$ = new BehaviorSubject<RouteInfo>({
        route: this.DEFAULT_ROUTE,
    });
    history$ = new BehaviorSubject<RouteInfo[]>([]);

    constructor() {}

    navigate(route: Route, params?: any) {
        const currentRoute = this.route$.value;
        const history = this.history$.value;
        history.push(currentRoute);
        this.route$.next({ route, params });
        this.history$.next(history);
    }

    pop(): void {
        const history = this.history$.value;
        const route = history.pop();
        this.history$.next(history);
        this.route$.next(route);
    }

    getCurrentRoute(): Observable<RouteInfo> {
        return this.route$.asObservable();
    }

    getCurrentHistory() {
        return this.history$.asObservable();
    }

    getCurrentRouteParams() {
        return this.route$.getValue().params;
    }
}
