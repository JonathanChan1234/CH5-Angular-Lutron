import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MotorActionType, SceneAction } from 'src/app/model/action';
import { AppService } from 'src/app/service/app/app.service';
import {
    PAGE_SCENE_ACTION_CREATE,
    PAGE_SCENE_TABLE,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';

@Component({
    selector: 'app-scene-details',
    templateUrl: './scene-details.component.html',
    styleUrls: ['./scene-details.component.scss'],
})
export class SceneDetailsComponent implements OnInit {
    name: string;
    sceneId: string;
    actions$: Observable<SceneAction[]>;

    editMode = false;
    nameFormControl: FormControl;

    constructor(
        private router: RouterService,
        private sceneService: SceneService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        const params = this.router.getCurrentRouteParams();
        this.name = params?.name;
        this.sceneId = params?.id;
        if (!this.name || !this.sceneId) {
            alert('scene name is not found');
            return;
        }
        this.nameFormControl = new FormControl(this.name, Validators.required);
        this.actions$ = this.sceneService.getSceneActions(this.sceneId);
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeSceneName() {
        const newName = this.nameFormControl.value;
        if (newName === this.name) {
            this.editMode = false;
            return;
        }
        this.sceneService.changeSceneName(this.sceneId, newName).subscribe(
            () => {
                this.editMode = false;
                this.name = newName;
                this.appService.showSnackBarMsg({
                    type: 'success',
                    msg: 'Change Scene Name Successfully',
                });
            },
            (error) => {
                this.editMode = false;
                this.appService.showSnackBarMsg({
                    type: 'error',
                    msg: error.message,
                });
                this.nameFormControl.setValue(this.name);
            }
        );
    }

    getMotorAction(action: MotorActionType) {
        return action === 'raise' ? 'scene.raise' : 'scene.lower';
    }

    deleteAction(action: SceneAction) {
        this.sceneService.deleteActionFromScene(action.id).subscribe(
            () => {
                this.actions$ = this.sceneService.getSceneActions(this.sceneId);
                this.appService.showSnackBarMsg({
                    type: 'success',
                    msg: 'Delete Action Successfully',
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

    navigateToSceneTable() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }

    navigateToActionCreate() {
        this.router.navigate(PAGE_SCENE_ACTION_CREATE, {
            name: this.name,
            id: this.sceneId,
        });
    }
}
