import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Device } from 'src/app/model/device';
import { RoomService } from 'src/app/service/room/room.service';
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
    devices$: Observable<Device[]>;

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
        this.error$.next('');
        this.devices$ = this.roomService.getRoomLoadList(this.name).pipe(
            catchError((error) => {
                this.error$.next(error.message);
                return of([]);
            }),
            finalize(() => this.loading$.next(false))
        );
    }
}
