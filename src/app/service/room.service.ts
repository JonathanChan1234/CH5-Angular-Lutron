import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LOAD, ROOM } from './data';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private http: HttpClient) {}

    getRoomList() {
        const numberOfDevice = new Map<string, number>();
        for (const room of ROOM) {
            numberOfDevice.set(room, 0);
        }
        for (const load of LOAD) {
            if (numberOfDevice.has(load.roomId)) {
                const count = numberOfDevice.get(load.roomId) + 1;
                numberOfDevice.set(load.roomId, count);
            }
        }
        const list: { room: string; count: number }[] = [];
        for (const [room, count] of numberOfDevice) {
            list.push({ room, count });
        }
        return of(list);
    }

    getRoomLoadList(room: string) {
        const loadList = LOAD.filter(load => load.roomId === room);
        return of(loadList);
    }
}
