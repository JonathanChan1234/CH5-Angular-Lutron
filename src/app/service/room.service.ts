import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../model/device';
import { Room } from '../model/room';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private httpClient: HttpClient) {}

    getRoomList() {
        return this.httpClient
            .get<Room[]>('/room')
            .pipe(catchError(this.handleError));
    }

    getRoomLoadList(room: string) {
        return this.httpClient
            .get<Device[]>(`/device?room=${room}`)
            .pipe(catchError(this.handleError));
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
        return throwError(new Error(`${error.error.message}`));
    }
}
