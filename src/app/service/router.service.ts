import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PAGE_SCENE_ACTION_CREATE } from './route';

type RouteInfo = {
    path: string;
    params: any;
};

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    route$ = new BehaviorSubject<RouteInfo>({
        path: PAGE_SCENE_ACTION_CREATE,
        params: { name: 'Scene 1' },
    });

    constructor() {}

    navigate(path: string, params?: any) {
        this.route$.next({ path, params });
    }

    getCurrentRoute() {
        return this.route$;
    }
}
