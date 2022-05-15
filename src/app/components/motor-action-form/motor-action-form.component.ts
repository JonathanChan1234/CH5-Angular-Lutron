import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/model/device';
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

    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: RouterService,
        private sceneService: SceneService
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            motorAction: ['', Validators.required],
        });
    }

    addScene(): void {
        if (!this.formGroup.valid) {
            this.error = 'Please fill the required field';
            return;
        }
        this.error = '';
        this.sceneService
            .addMotorActionToScene(this.sceneId, {
                deviceId: this.device.id,
                action:
                    this.formGroup.value.motorAction === 'raise'
                        ? 'raise'
                        : 'lower',
            })
            .subscribe(
                () => {
                    this.router.navigate(PAGE_SCENE_DETAILS, {
                        id: this.sceneId,
                        name: this.sceneName,
                    });
                },
                (error) => {
                    this.error = error.message;
                }
            );
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
