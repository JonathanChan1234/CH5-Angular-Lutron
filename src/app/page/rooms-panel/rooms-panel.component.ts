import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room/room.service';

@Component({
    selector: 'app-rooms-panel',
    templateUrl: './rooms-panel.component.html',
    styleUrls: ['./rooms-panel.component.scss'],
})
export class RoomsPanelComponent implements OnInit {
    loading$: Observable<boolean>;
    rooms$: Observable<Room[]>;
    error$ = new BehaviorSubject<Error | false>(false);
    refresh$ = new BehaviorSubject<boolean>(true);

    constructor(
        private roomService: RoomService,
        private changeDetectRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.rooms$ = this.refresh$.pipe(
            switchMap(() =>
                this.roomService.getRoomList().pipe(
                    tap(() => this.error$.next(false)),
                    catchError((error) => {
                        this.error$.next(error);
                        return of(undefined);
                    })
                )
            ),
            shareReplay(1)
        );
        this.loading$ = merge(
            this.refresh$.pipe(mapTo(true)),
            this.rooms$.pipe(
                catchError(() => of(false)),
                mapTo(false)
            )
        ).pipe(tap(() => this.changeDetectRef.detectChanges()));
    }

    refresh() {
        this.refresh$.next(true);
    }
}
