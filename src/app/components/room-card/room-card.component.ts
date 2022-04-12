import { Component, Input, OnInit } from '@angular/core';
import { PAGE_ROOM_VIEW } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
    @Input()
    name = '';

    @Input()
    count = 0;

    constructor(private router: RouterService) {}

    ngOnInit(): void {}
    navigateRoom() {
        this.router.navigate(PAGE_ROOM_VIEW, { name: this.name });
    }
}
