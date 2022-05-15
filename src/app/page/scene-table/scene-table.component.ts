import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSceneDialogComponent } from 'src/app/components/create-scene-dialog/create-scene-dialog.component';
import { Scene } from 'src/app/model/scene';
import { AppService } from 'src/app/service/app/app.service';
import { CrestronService } from 'src/app/service/crestron/crestron.service';
import { PAGE_SCENE_DETAILS } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';
import { SceneDataSource } from './SceneDataSource';
declare var CrComLib: any;

@Component({
    selector: 'app-scene-table',
    templateUrl: './scene-table.component.html',
    styleUrls: ['./scene-table.component.scss'],
})
export class SceneTableComponent implements OnInit {
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
    }

    startScene(scene: Scene) {
        this.crestronService.activateScene(scene.id);
    }

    addScene() {
        const dialogRef = this.dialog.open(CreateSceneDialogComponent, {
            width: '300px',
        });
        dialogRef.afterClosed().subscribe((sceneName) => {
            // if the user cancelled the operation, ignore the result
            if (!sceneName) return;
            // Create new scene after the dialog is closed
            this.sceneService.createNewScene(sceneName).subscribe(
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
                        msg: error,
                    });
                    this.dataSource.loadScene();
                }
            );
        });
    }

    deleteScene(scene: Scene) {
        this.sceneService.deleteScene(scene.id).subscribe(
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
                    msg: error,
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
