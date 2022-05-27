import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DimmerAction, MotorAction, SwitchAction } from 'src/app/model/action';
import { environment } from 'src/environments/environment';
import { SceneService } from '../scene/scene.service';

declare var CrComLib: any;

@Injectable({
    providedIn: 'root',
})
export class CrestronService implements OnDestroy {
    fbSignal = environment.production ? '1' : 'fb';
    controlSignal = '2';
    sceneSignal = '3';
    loadPromptSignal = '1';


    private crestronSubscription: number;
    private lutronDeviceFbMap: Map<number, number> = new Map();
    private lutronDeviceFb$: Subject<Map<number, number>>;

    constructor(private sceneService: SceneService) {
        this.lutronDeviceFb$ = new Subject();

        this.crestronSubscription = CrComLib.subscribeState(
            's',
            this.fbSignal,
            this.loadFbCallback.bind(this)
        );

        if (!environment.production) {
            CrComLib.subscribeState('s', this.controlSignal, (val: string) => {
                console.log(`From control signal: ${val}`);
            });
            CrComLib.subscribeState('s', this.sceneSignal, (val: string) => {
                console.log(`From scene signal: ${val}`);
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

    askForLoadFb(id: number) {
       CrComLib.publishEvent('n', this.loadPromptSignal, id) ;
    }

    setDimmerLevel(id: number, level: number) {
        console.log(`set dimmer id ${id} to level ${level}`);
        // for testing only
        if (!environment.production)
            CrComLib.publishEvent('s', this.fbSignal, `${id},${level}`);
        CrComLib.publishEvent('s', this.controlSignal, `1,${id},${level},1,0`);
    }

    setSwitchLevel(id: number, power: boolean) {
        console.log(`set switchw id ${id} to power ${power}`);
        // for testing only
        if (!environment.production)
            CrComLib.publishEvent(
                's',
                this.fbSignal,
                `${id},${power ? 100 : 0}`
            );
        CrComLib.publishEvent(
            's',
            this.controlSignal,
            `2,${id},${power ? 100 : 0},0`
        );
    }

    setMotorAction(id: number, action: 'raise' | 'lower' | 'stop') {
        console.log(`set motor id ${id} to action ${action}`);
        CrComLib.publishEvent(
            's',
            this.controlSignal,
            `3,${id},${action === 'raise' ? 2 : action === 'lower' ? 3 : 4}`
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
                        const dimmerAction = action as DimmerAction;
                        cmd += `1,${action.device.id},${dimmerAction.brightness},${dimmerAction.fade},${dimmerAction.delay}/`;
                        break;
                    case 'switch':
                        const switchAction = action as SwitchAction;
                        cmd += `2,${action.device.id},${
                            switchAction.power ? 100 : 0
                        },0/`;
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
