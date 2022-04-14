import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PAGE_SCENE_DETAILS, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';
import { Load, MotorActionType, MotorLoad } from 'src/app/service/type';

@Component({
    selector: 'app-motor-action-form',
    templateUrl: './motor-action-form.component.html',
    styleUrls: ['./motor-action-form.component.scss'],
})
export class MotorActionFormComponent implements OnInit {
    @Input() load!: Load;
    @Input() sceneId!: string;
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
        const motorLoad = this.load as MotorLoad;
        this.sceneService
            .addActionToScene(this.sceneId, {
                ...motorLoad,
                action:
                    this.formGroup.value.motorAction === 'raise'
                        ? MotorActionType.RAISE
                        : MotorActionType.LOWER,
            })
            .subscribe({
                next: () => {
                    this.router.navigate(PAGE_SCENE_DETAILS, { name: this.sceneId });
                },
                complete: () => {},
                error: error => {
                    this.error = error.message;
                },
            });
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
