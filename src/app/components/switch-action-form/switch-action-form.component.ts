import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/model/device';
import { AppService } from 'src/app/service/app/app.service';
import {
    PAGE_SCENE_DETAILS,
    PAGE_SCENE_TABLE,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';

@Component({
    selector: 'app-switch-action-form',
    templateUrl: './switch-action-form.component.html',
    styleUrls: ['./switch-action-form.component.scss'],
})
export class SwitchActionFormComponent implements OnInit {
    @Input()
    device!: Device;

    @Input()
    sceneId!: string;

    @Input()
    sceneName!: string;

    powerState = false;

    constructor(
        private sceneService: SceneService,
        private appService: AppService,
        private router: RouterService
    ) {}

    ngOnInit(): void {}

    onToggleChange() {
        this.powerState = !this.powerState;
    }

    addScene() {
        this.sceneService
            .addSwitchActionToScene(this.sceneId, {
                deviceId: this.device.id,
                power: this.powerState,
            })
            .subscribe(
                () => {
                    this.appService.showSnackBarMsg({
                        type: 'success',
                        msg: 'Create actions successfully',
                    });
                    this.router.navigate(PAGE_SCENE_DETAILS, {
                        id: this.sceneId,
                        name: this.sceneName,
                    });
                },
                (error) => {
                    this.appService.showSnackBarMsg({
                        type: 'error',
                        msg: error.message,
                    });
                }
            );
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
