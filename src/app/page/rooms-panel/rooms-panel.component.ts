import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room.service';

@Component({
    selector: 'app-rooms-panel',
    templateUrl: './rooms-panel.component.html',
    styleUrls: ['./rooms-panel.component.scss'],
})
export class RoomsPanelComponent implements OnInit {
    rooms$: Observable<Room[]>;
    constructor(private roomService: RoomService) {}

    ngOnInit(): void {
        this.rooms$ = this.roomService.getRoomList();
    }
}
