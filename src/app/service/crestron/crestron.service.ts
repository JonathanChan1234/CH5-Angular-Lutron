import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DimmerAction, MotorAction, SwitchAction } from 'src/app/model/action';
import { environment } from 'src/environments/environment';
import { SceneService } from '../scene/scene.service';

declare var CrComLib: any;

@Injectable({
    providedIn: 'root',
})
export class CrestronService implements OnDestroy {
    fbSignal = 'load';
    controlSignal = 'control';
    sceneSignal = 'scene';

    private crestronSubscription: number;
    private lutronDeviceFbMap: Map<number, number> = new Map();
    private lutronDeviceFb$: BehaviorSubject<Map<number, number>>;

    constructor(private sceneService: SceneService) {
        this.lutronDeviceFb$ = new BehaviorSubject(this.lutronDeviceFbMap);
        this.crestronSubscription = CrComLib.subscribeState(
            's',
            this.fbSignal,
            this.loadFbCallback.bind(this)
        );
        if (!environment.production) {
            CrComLib.subscribeState('s', this.controlSignal, (val: string) => {
                console.log(val);
            });
            CrComLib.subscribeState('s', this.sceneSignal, (val: string) => {
                console.log(val);
            });
        }
    }

    getLoadFbById(id: number) {
        if (!this.lutronDeviceFbMap.has(id)) {
            this.lutronDeviceFbMap.set(id, 0);
            this.lutronDeviceFb$.next(this.lutronDeviceFbMap);
        }
        return this.lutronDeviceFb$.pipe(map((fb) => fb.get(id)));
    }

    setDimmerLevel(id: number, level: number) {
        // for development only
        if (!environment.production)
            CrComLib.publishEvent('s', this.fbSignal, `${id},${level}`);
        CrComLib.publishEvent('s', this.controlSignal, `${id},${level}`);
    }

    setSwitchLevel(id: number, power: boolean) {
        CrComLib.publishEvent(
            's',
            this.controlSignal,
            `${id},${power ? 100 : 0}`
        );
    }

    setMotorAction(id: number, action: 'raise' | 'lower' | 'stop') {
        CrComLib.publishEvent(
            's',
            this.controlSignal,
            `${id},${action === 'raise' ? 2 : action === 'lower' ? 3 : 4}`
        );
    }

    loadFbCallback(params: string) {
        // parse the feedback params string
        const paramsList = params.split(',');
        if (paramsList.length !== 2) return;
        const [idString, levelString] = paramsList;
        const id = parseInt(idString, 10);
        const level = parseInt(levelString, 10);
        if (isNaN(id) || isNaN(level)) return;

        // update the map and the subject
        this.lutronDeviceFbMap.set(id, level);
        this.lutronDeviceFb$.next(this.lutronDeviceFbMap);
    }

    activateScene(sceneId: string) {
        let cmd = '';
        this.sceneService.getSceneActions(sceneId).subscribe((actions) => {
            for (const action of actions) {
                switch (action.device.type) {
                    case 'dimmer':
                        cmd += `1,${action.device.id},${
                            (action as DimmerAction).brightness
                        }/`;
                        break;
                    case 'switch':
                        cmd += `2,${action.device.id},${
                            (action as SwitchAction).power ? 100 : 0
                        }/`;
                        break;
                    case 'motor':
                        cmd += `3,${action.device.id},${
                            (action as MotorAction).action === 'raise' ? 2 : 3
                        }/`;
                        break;
                }
            }
            CrComLib.publishEvent(
                's',
                this.sceneSignal,
                cmd.substring(0, cmd.length - 1)
            );
        });
    }

    ngOnDestroy(): void {
        CrComLib.unsubscribeState(
            's',
            this.fbSignal,
            this.crestronSubscription
        );
    }
}
