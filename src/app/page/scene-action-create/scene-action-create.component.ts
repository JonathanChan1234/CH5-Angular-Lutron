import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/service/room.service';
import { PAGE_SCENE_DETAILS, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';
import { SceneService } from 'src/app/service/scene.service';
import { Load } from 'src/app/service/type';

@Component({
    selector: 'app-scene-action-create',
    templateUrl: './scene-action-create.component.html',
    styleUrls: ['./scene-action-create.component.scss'],
})
export class SceneActionCreateComponent implements OnInit {
    scene!: string;

    roomDeviceGroup!: FormGroup;
    selectedRoom?: string;
    selectedLoad?: Load;

    room$!: Observable<string[]>;
    load$!: Observable<Load[]>;

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

        this.router.getCurrentRoute().subscribe(route => (this.scene = route?.params?.name));
        this.room$ = this.roomService.getRoomList().pipe(map(list => list.map(l => l.room)));
        this.load$ = this.roomDeviceGroup.controls.room.valueChanges.pipe(
            switchMap(room => {
                if (!this.scene) {
                    return of([] as Load[]);
                }
                return this.sceneService.getSceneLoadList(this.scene, room);
            })
        );
        this.roomDeviceGroup.controls.device.valueChanges.subscribe(
            load => (this.selectedLoad = load)
        );
    }

    back() {
        if (this.scene) {
            this.router.navigate(PAGE_SCENE_DETAILS, { name: this.scene });
        } else {
            this.router.navigate(PAGE_SCENE_TABLE);
        }
    }
}
