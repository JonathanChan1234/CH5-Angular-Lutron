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

    formGroup!: FormGroup;
    powerState = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private sceneService: SceneService,
        private router: RouterService
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            delay: [
                0,
                Validators.compose([Validators.required, Validators.min(0)]),
            ],
        });
    }

    onToggleChange() {
        this.powerState = !this.powerState;
    }

    addScene() {
        if (!this.formGroup.valid) {
            this.error = 'Please fill all the required field';
            return;
        }
        this.error = '';
        this.sceneService
            .addSwitchActionToScene(this.sceneId, {
                deviceId: this.device.id,
                power: this.powerState,
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
