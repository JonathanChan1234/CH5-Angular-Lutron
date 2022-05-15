import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Device } from 'src/app/model/device';
import { RoomService } from 'src/app/service/room/room.service';
import {
    PAGE_SCENE_DETAILS,
    PAGE_SCENE_TABLE,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';
import { SceneService } from 'src/app/service/scene/scene.service';

@Component({
    selector: 'app-scene-action-create',
    templateUrl: './scene-action-create.component.html',
    styleUrls: ['./scene-action-create.component.scss'],
})
export class SceneActionCreateComponent implements OnInit {
    sceneId!: string;
    sceneName!: string;

    roomDeviceGroup!: FormGroup;
    selectedRoom?: string;
    selectedLoad?: Device;

    room$!: Observable<string[]>;
    load$!: Observable<Device[]>;

    constructor(
        private router: RouterService,
        private formBuilder: FormBuilder,
        private roomService: RoomService,
        private sceneService: SceneService
    ) {}

    ngOnInit(): void {
        this.roomDeviceGroup = this.formBuilder.group({
            device: ['', Validators.required],
            room: ['', Validators.required],
        });
        this.sceneId = this.router.getCurrentRouteParams()?.id;
        this.sceneName = this.router.getCurrentRouteParams()?.name;
        if (!this.sceneId) {
            alert('Scene Id does not exist');
            return;
        }

        this.room$ = this.roomService
            .getRoomList()
            .pipe(map((list) => list.map((l) => l.name)));
        this.load$ = this.roomDeviceGroup.controls.room.valueChanges.pipe(
            switchMap((room) => {
                if (!this.sceneId) {
                    return of([] as Device[]);
                }
                return this.sceneService.getSceneLoadList(this.sceneId, room);
            })
        );
        this.roomDeviceGroup.controls.device.valueChanges.subscribe(
            (load) => (this.selectedLoad = load)
        );
    }

    back() {
        if (this.sceneId) {
            this.router.navigate(PAGE_SCENE_DETAILS, {
                name: this.sceneName,
                id: this.sceneId,
            });
        } else {
            this.router.navigate(PAGE_SCENE_TABLE);
        }
    }
}
