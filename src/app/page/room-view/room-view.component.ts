import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/service/room.service';
import { RouterService } from 'src/app/service/router.service';
import { Load } from 'src/app/service/type';

@Component({
    selector: 'app-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
    name = '';
    load$: Observable<Load[]>;

    constructor(private router: RouterService, private roomService: RoomService) {}

    ngOnInit(): void {
        this.load$ = this.router.getCurrentRoute().pipe(
            switchMap(route => {
                const name = route?.params?.name;
                if (!name) {
                    return of([]);
                }
                return this.roomService.getRoomLoadList(name);
            })
        );
    }
}
