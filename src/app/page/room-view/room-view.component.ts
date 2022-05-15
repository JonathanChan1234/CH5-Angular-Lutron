import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from 'src/app/model/device';
import { RoomService } from 'src/app/service/room/room.service';
import { RouterService } from 'src/app/service/router/router.service';

@Component({
    selector: 'app-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
    name = '';
    devices$: Observable<Device[]>;

    constructor(
        private router: RouterService,
        private roomService: RoomService
    ) {}

    ngOnInit(): void {
        const name = this.router.getCurrentRouteParams()?.name;
        if (!name) {
            alert('room name is not found');
            return;
        }
        this.devices$ = this.roomService.getRoomLoadList(name);
    }
}
