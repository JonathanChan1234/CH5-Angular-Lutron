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
    selector: 'app-dimmer-action-form',
    templateUrl: './dimmer-action-form.component.html',
    styleUrls: ['./dimmer-action-form.component.scss'],
})
export class DimmerActionFormComponent implements OnInit {
    @Input()
    device!: Device;

    @Input()
    sceneId!: string;

    @Input()
    sceneName!: string;

    sliderValue = 0;
    powerState = false;
    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: RouterService,
        private sceneService: SceneService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            fade: [
                2,
                Validators.compose([Validators.required, Validators.min(0)]),
            ],
            delay: [
                0,
                Validators.compose([Validators.required, Validators.min(0)]),
            ],
        });
    }

    onToggleChange(): void {
        const level = this.powerState ? 0 : 100;
        this.changeBrightness(level);
    }

    onSliderChange(value?: number | null): void {
        if (!value) return;
        this.changeBrightness(value);
    }

    changeBrightness(value: number): void {
        this.sliderValue = value;
        this.powerState = this.sliderValue > 0;
    }

    addScene(): void {
        if (!this.formGroup.valid) {
            this.appService.showSnackBarMsg({
                msg: "Please fill in all the requried fields and make sure delay and fade time shouldn't be less than 0",
                type: 'error',
            });
            return;
        }
        const { fade, delay } = this.formGroup.value;

        this.sceneService
            .addDimmerActionToScene(this.sceneId, {
                deviceId: this.device.joinId,
                brightness: this.sliderValue,
                delay,
                fade,
            })
            .subscribe(
                () => {
                    this.appService.showSnackBarMsg({
                        msg: 'Create action successfully',
                        type: 'success',
                    });
                    this.router.navigate(PAGE_SCENE_DETAILS, {
                        id: this.sceneId,
                        name: this.sceneName,
                    });
                },
                (error) => {
                    this.appService.showSnackBarMsg({
                        msg: error.message,
                        type: 'error',
                    });
                }
            );
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
