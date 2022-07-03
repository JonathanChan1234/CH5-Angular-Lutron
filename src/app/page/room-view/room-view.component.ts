import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from 'src/app/model/device';
import { RoomService } from 'src/app/service/room/room.service';
import { PAGE_ROOMS_PANEL } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';

@Component({
    selector: 'app-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
    name!: string;
    loading$ = new BehaviorSubject<boolean>(true);
    error$ = new BehaviorSubject<string>('');
    devices: Device[];

    constructor(
        private router: RouterService,
        private roomService: RoomService
    ) {}

    ngOnInit(): void {
        this.name = this.router.getCurrentRouteParams()?.name;
        if (!this.name) {
            this.error$.next('Oops! Room not found');
            return;
        }
        this.roomService.getRoomLoadList(this.name).subscribe(
            (devices: Device[]) => {
                this.devices = devices;
                this.loading$.next(false);
            },
            (error) => {
                this.error$.next(error.message);
                this.loading$.next(false);
            }
        );
    }

    backToRoomPanel() {
        this.router.navigate(PAGE_ROOMS_PANEL);
    }
}
