import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route } from './route';

export type RouteInfo = {
    route: Route;
    params?: any;
};

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    private readonly DEFAULT_ROUTE: RouteInfo = {
        route: Route.DEVICE_OVERVIEW,
    };
    route$ = new BehaviorSubject<RouteInfo>(this.DEFAULT_ROUTE);
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

    reset(): void {
        this.history$.next([]);
        this.route$.next(this.DEFAULT_ROUTE);
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
