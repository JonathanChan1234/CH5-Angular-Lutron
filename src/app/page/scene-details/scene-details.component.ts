import { Component, OnInit } from '@angular/core';
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
    scene: string;
    columns = ['load', 'room', 'action'];
    dataSource!: SceneAction[];

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
    }

    getMotorAction(action: MotorActionType) {
        switch (action) {
            case MotorActionType.LOWER:
                return 'LOWER';
            case MotorActionType.RAISE:
                return 'RAISE';
            case MotorActionType.STOP:
                return 'STOP';
        }
    }

    navigateToSceneTable() {
        this.router.navigate(PAGE_SCENE_TABLE);
    }

    navigateToActionCreate() {
        this.router.navigate(PAGE_SCENE_ACTION_CREATE, { name: this.scene });
    }
}
