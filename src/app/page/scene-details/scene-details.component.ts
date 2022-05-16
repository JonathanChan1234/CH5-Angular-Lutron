import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MotorActionType, SceneAction } from 'src/app/model/action';
import { AppService } from 'src/app/service/app/app.service';
import {
    PAGE_SCENE_ACTION_CREATE,
    PAGE_SCENE_TABLE,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';
import { SceneActionsDataSource } from './SceneActionsDataSource';

@Component({
    selector: 'app-scene-details',
    templateUrl: './scene-details.component.html',
    styleUrls: ['./scene-details.component.scss'],
})
export class SceneDetailsComponent implements OnInit {
    name: string;
    sceneId: string;
    columns = ['load', 'room', 'action', 'option'];
    dataSource!: SceneActionsDataSource;

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
        this.dataSource = new SceneActionsDataSource(
            this.sceneService,
            this.sceneId
        );
        this.dataSource.loadActions();
        this.nameFormControl = new FormControl(this.name, Validators.required);
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeSceneName() {
        const newName = this.nameFormControl.value;
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
            }
        );
    }

    getMotorAction(action: MotorActionType) {
        return action === 'raise' ? 'scene.raise' : 'scene.lower';
    }

    deleteAction(action: SceneAction) {
        this.sceneService.deleteActionFromScene(action.id).subscribe(
            () => {
                this.dataSource.loadActions();
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
