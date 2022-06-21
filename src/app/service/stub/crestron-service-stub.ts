import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export default class CrestronServiceStub {
    map = new Map<number, number>();
    fb$: Subject<Map<number, number>> = new Subject();

    getLoadFbById(id: number): Observable<number> {
        if (!this.map.has(id)) this.map.set(id, 0);
        this.fb$.next(this.map);
        return this.fb$.pipe(map((m) => m.get(id)));
    }

    askForLoadFb(id: number) {
        // No need to implement for mock service
    }

    setDimmerLevel(id: number, level: number) {
        this.map.set(id, level);
        this.fb$.next(this.map);
    }

    setSwitchLevel(id: number, power: boolean) {
        this.map.set(id, power ? 100 : 0);
        this.fb$.next(this.map);
    }

    setMotorAction(id: number, action: 'raise' | 'stop' | 'lower') {
        // Return the parameter as validation
        return { id, action };
    }
}
