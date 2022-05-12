import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/model/device';
import { PAGE_SCENE_DETAILS, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';

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
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: RouterService,
        private sceneService: SceneService
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            fadeTime: [
                2,
                Validators.compose([Validators.required, Validators.min(0)]),
            ],
            delayTime: [
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
        if (!value) {
            return;
        }
        this.changeBrightness(value);
    }

    changeBrightness(value: number): void {
        this.sliderValue = value;
        if (this.sliderValue > 0) {
            this.powerState = true;
        } else {
            this.powerState = false;
        }
    }

    addScene(): void {
        if (!this.formGroup.valid) {
            this.error =
                'Please fill in all the required fields and no negative number is allowed';
            return;
        }
        this.error = '';
        const { fade, delay } = this.formGroup.value;
        this.sceneService
            .addDimmerActionToScene(this.sceneId, {
                device: { ...this.device, type: 'dimmer' },
                brightness: this.sliderValue,
                delay,
                fade,
            })
            .subscribe({
                next: () => {
                    this.router.navigate(PAGE_SCENE_DETAILS, {
                        id: this.sceneName,
                        name: this.sceneId,
                    });
                },
                error: (error) => {
                    this.error = error.message;
                },
            });
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
