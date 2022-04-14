import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PAGE_SCENE_DETAILS, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';
import { Load, SwitchLoad } from 'src/app/service/type';

@Component({
    selector: 'app-switch-action-form',
    templateUrl: './switch-action-form.component.html',
    styleUrls: ['./switch-action-form.component.scss'],
})
export class SwitchActionFormComponent implements OnInit {
    @Input()
    load!: Load;
    @Input()
    sceneId!: string;
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
            delay: [0, Validators.compose([Validators.required, Validators.min(0)])],
        });
    }

    onToggleChange() {
        this.powerState = !this.powerState;
    }

    addScene() {
        if (!this.formGroup.valid) {
            alert('Please fill all the required field');
            return;
        }
        const switchLoad = this.load as SwitchLoad;
        this.sceneService
            .addActionToScene(this.sceneId, {
                ...switchLoad,
                power: this.powerState,
                delay: this.formGroup.value.delay,
            })
            .subscribe(() => {
                this.router.navigate(PAGE_SCENE_DETAILS, { name: this.sceneId });
            });
    }

    back() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }
}
