import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PAGE_SCENE_DETAILS } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';

interface SceneTableRow {
    name: string;
    numberOfAction: number;
    action: any;
}

@Component({
    selector: 'app-scene-table',
    templateUrl: './scene-table.component.html',
    styleUrls: ['./scene-table.component.scss'],
})
export class SceneTableComponent implements OnInit {
    @ViewChild(MatTable) table: MatTable<SceneTableRow>;
    dataSource!: SceneTableRow[];
    columns = ['name', 'numberOfAction', 'action'];

    constructor(private router: RouterService, private sceneService: SceneService) {}

    ngOnInit(): void {
        this.sceneService.getSceneList().subscribe(scenes => {
            this.dataSource = scenes.map(scene => ({
                name: scene.name,
                numberOfAction: scene.actions.length,
                action: null,
            }));
        });
    }

    addScene() {
        this.sceneService.createNewScene().subscribe(scene => {
            this.router.navigate(PAGE_SCENE_DETAILS, { name: scene });
        });
    }

    deleteScene(row: SceneTableRow) {
        this.sceneService.deleteScene(row.name).subscribe(scenes => {
            this.dataSource = scenes.map(scene => ({
                name: scene.name,
                numberOfAction: scene.actions.length,
                action: null,
            }));
            this.table.renderRows();
        });
    }

    navigateToDetails(scene: string) {
        this.router.navigate(PAGE_SCENE_DETAILS, { name: scene });
    }
}
