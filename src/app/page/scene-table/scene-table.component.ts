import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSceneDialogComponent } from 'src/app/components/create-scene-dialog/create-scene-dialog.component';
import { Scene } from 'src/app/model/scene';
import { PAGE_SCENE_DETAILS } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';
import { errorSnackBarMsg, successSnackBarMsg } from 'src/app/utils/utils';
import { SceneDataSource } from './SceneDataSource';

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
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.dataSource = new SceneDataSource(this.sceneService);
        this.dataSource.loadScene();
    }

    addScene() {
        const dialogRef = this.dialog.open(CreateSceneDialogComponent, {
            width: '250px',
        });
        dialogRef.afterClosed().subscribe((sceneName) => {
            // if the user cancelled the operation, ignore the result
            if (!sceneName) return;
            // Create new scene after the dialog is closed
            this.sceneService.createNewScene(sceneName).subscribe(
                () => {
                    this.snackBar.open(
                        successSnackBarMsg('Scene created successfully'),
                        'close',
                        { duration: 2000 }
                    );
                    this.dataSource.loadScene();
                },
                (error) => {
                    this.snackBar.open(errorSnackBarMsg(error), 'close', {
                        duration: 2000,
                    });
                }
            );
        });
    }

    deleteScene(scene: Scene) {
        this.sceneService.deleteScene(scene.id).subscribe(
            () => {
                this.snackBar.open(
                    successSnackBarMsg('Scene deleted successfully'),
                    'close',
                    { duration: 2000 }
                );
                this.dataSource.loadScene();
            },
            (error) => {
                this.snackBar.open(errorSnackBarMsg(error), 'close', {
                    duration: 2000,
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
