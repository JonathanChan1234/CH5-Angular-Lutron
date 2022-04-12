import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';

@Component({
    selector: 'app-rooms-panel',
    templateUrl: './rooms-panel.component.html',
    styleUrls: ['./rooms-panel.component.scss'],
})
export class RoomsPanelComponent implements OnInit {
    rooms = [];

    constructor(private roomService: RoomService) {}

    ngOnInit(): void {
        this.roomService.getRoomList().subscribe(rooms => {
            this.rooms = rooms;
        });
    }
}
