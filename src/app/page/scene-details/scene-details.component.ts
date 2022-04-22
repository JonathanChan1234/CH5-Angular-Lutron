import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PAGE_SCENE_ACTION_CREATE, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';
import { MotorActionType, SceneAction } from 'src/app/service/type';

@Component({
    selector: 'app-scene-details',
    templateUrl: './scene-details.component.html',
    styleUrls: ['./scene-details.component.scss'],
})
export class SceneDetailsComponent implements OnInit {
    @ViewChild(MatTable) table: MatTable<SceneAction>;

    scene: string;
    columns = ['load', 'room', 'action', 'option'];
    dataSource!: SceneAction[];

    editMode = false;
    nameFormControl: FormControl;

    constructor(private router: RouterService, private sceneService: SceneService) {}

    ngOnInit(): void {
        this.router
            .getCurrentRoute()
            .pipe(
                switchMap(route => {
                    this.scene = route?.params?.name;
                    if (!this.scene) {
                        return of([] as SceneAction[]);
                    }
                    return this.sceneService.getSceneActions(this.scene);
                })
            )
            .subscribe(actions => {
                this.dataSource = actions;
            });
        this.nameFormControl = new FormControl(this.scene, Validators.required);
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeSceneName() {
        this.scene = this.nameFormControl.value;
        this.editMode = false;
    }

    getMotorAction(action: MotorActionType) {
        switch (action) {
            case MotorActionType.LOWER:
                return 'scene.lower';
            case MotorActionType.RAISE:
                return 'scene.raise';
            case MotorActionType.STOP:
                return 'STOP';
        }
    }

    deleteAction(action: SceneAction) {
        this.sceneService.deleteActionFromScene(this.scene, action).subscribe(actions => {
            this.dataSource = actions;
            this.table.renderRows();
        });
    }

    navigateToSceneTable() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }

    navigateToActionCreate() {
        this.router.navigate(PAGE_SCENE_ACTION_CREATE, { name: this.scene });
    }
}
