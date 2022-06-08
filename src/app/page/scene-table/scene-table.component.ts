import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CreateSceneDialogComponent } from 'src/app/components/create-scene-dialog/create-scene-dialog.component';
import { DeleteSceneDialogComponent } from 'src/app/components/delete-scene-dialog/delete-scene-dialog.component';
import { Scene } from 'src/app/model/scene';
import { AppService } from 'src/app/service/app/app.service';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { PAGE_SCENE_DETAILS } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';
import { SceneDataSource } from './SceneDataSource';

@Component({
    selector: 'app-scene-table',
    templateUrl: './scene-table.component.html',
    styleUrls: ['./scene-table.component.scss'],
})
export class SceneTableComponent implements OnInit {
    scenes$: Observable<Scene[]>;
    dataSource!: SceneDataSource;
    columns = ['name', 'action'];

    constructor(
        private router: RouterService,
        private sceneService: SceneService,
        private dialog: MatDialog,
        private appService: AppService,
        private crestronService: CrestronService
    ) {}

    ngOnInit(): void {
        this.dataSource = new SceneDataSource(this.sceneService);
        this.dataSource.loadScene();
        this.scenes$ = this.sceneService.getSceneList();
    }

    activateScene(scene: Scene) {
        this.crestronService.activateScene(scene.id);
    }

    addScene() {
        const dialogRef = this.dialog.open(CreateSceneDialogComponent, {
            width: '300px',
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((sceneName) => sceneName),
                switchMap((sceneName) =>
                    this.sceneService.createNewScene(sceneName)
                )
            )
            .subscribe(
                () => {
                    this.appService.showSnackBarMsg({
                        type: 'success',
                        msg: 'Scene created successfully',
                    });
                    this.dataSource.loadScene();
                },
                (error) => {
                    this.appService.showSnackBarMsg({
                        type: 'error',
                        msg: error.message,
                    });
                }
            );
    }

    deleteScene(scene: Scene) {
        const dialogRef = this.dialog.open(DeleteSceneDialogComponent, {
            data: scene.name,
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((result) => result),
                switchMap(() => this.sceneService.deleteScene(scene.id))
            )
            .subscribe(
                () => {
                    this.appService.showSnackBarMsg({
                        type: 'success',
                        msg: 'Scene deleted successfully',
                    });
                    this.dataSource.loadScene();
                },
                (error) => {
                    this.appService.showSnackBarMsg({
                        type: 'error',
                        msg: error.message,
                    });
                }
            );
    }

    navigateToDetails(scene: Scene) {
        this.router.navigate(PAGE_SCENE_DETAILS, {
            name: scene.name,
            id: scene.id,
        });
    }
}
