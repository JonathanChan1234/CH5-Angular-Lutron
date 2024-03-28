import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/model/device';
import { AppService } from 'src/app/service/app/app.service';
import {
    PAGE_SCENE_DETAILS,
    PAGE_SCENE_TABLE,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';

@Component({
    selector: 'app-motor-action-form',
    templateUrl: './motor-action-form.component.html',
    styleUrls: ['./motor-action-form.component.scss'],
})
export class MotorActionFormComponent implements OnInit {
    @Input() device!: Device;

    @Input() sceneId!: string;

    @Input() sceneName!: string;

    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: RouterService,
        private sceneService: SceneService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            motorAction: ['', Validators.required],
        });
    }

    addScene(): void {
        if (!this.formGroup.valid) {
            this.appService.showSnackBarMsg({
                type: 'success',
                msg: 'Please fill all the required field',
            });
            return;
        }
        this.sceneService
            .addMotorActionToScene(this.sceneId, {
                deviceId: this.device.joinId,
                action:
                    this.formGroup.value.motorAction === 'raise'
                        ? 'raise'
                        : 'lower',
            })
            .subscribe(
                () => {
                    this.appService.showSnackBarMsg({
                        type: 'success',
                        msg: 'Create action successfully',
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
