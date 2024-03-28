import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../../model/device';
import { Room } from '../../model/room';
import { DeviceCacheService } from './device-cache.service';
import { RoomCacheService } from './room-cache.service';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(
        private httpClient: HttpClient,
        private roomCacheService: RoomCacheService,
        private deviceCacheService: DeviceCacheService
    ) {}

    getRoomList(): Observable<Room[]> {
        // let room$ = this.roomCacheService.getValue();
        // if (!room$) {
        //     room$ = this.httpClient
        //         .get<Room[]>('/room')
        //         .pipe(shareReplay(1), catchError(this.handleError));
        //     this.roomCacheService.setValue(room$);
        // }
        // return room$;
        return of<Room[]>([]);
    }

    clearRoomCache() {
        this.roomCacheService.clearCache();
    }

    getRoomLoadList(room: string): Observable<Device[]> {
        // const object = { room }; // cache key
        // let device$ = this.deviceCacheService.getValue(object);
        // if (!device$) {
        //     device$ = this.httpClient
        //         .get<Device[]>(`/device?room=${room}`)
        //         .pipe(shareReplay(1), catchError(this.handleError));
        //     this.deviceCacheService.setValue(device$, object);
        // }
        // return device$;
        return of<Device[]>([]);
    }

    clearDeviceCache() {
        this.deviceCacheService.clearCache();
    }

    changeRoomName(id: string, name: string) {
        return this.httpClient
            .put(`/room/${id}`, { name })
            .pipe(catchError(this.handleError));
    }

    changeLoadName(id: number, name: string) {
        return this.httpClient
            .put(`/device/${id}`, { name })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Error at RoomService; Client Side:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            console.error(
                `Error at RoomService; Backend returned code ${error.status}, body was: `,
                error.error.message
            );
        }
        const errorMsg = error.error.message;

        return throwError(
            new Error(
                `${Array.isArray(errorMsg) ? errorMsg.join(',') : errorMsg}`
            )
        );
    }
}
