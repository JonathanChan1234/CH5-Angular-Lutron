import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { LOAD, ROOM } from './data';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    numberOfDevice = new Map<string, number>();
    room$: BehaviorSubject<{ room: string; count: number }[]>;

    constructor() {
        for (const room of ROOM) {
            this.numberOfDevice.set(room, 0);
        }
        for (const load of LOAD) {
            if (this.numberOfDevice.has(load.roomId)) {
                const count = this.numberOfDevice.get(load.roomId) + 1;
                this.numberOfDevice.set(load.roomId, count);
            }
        }
        this.room$ = new BehaviorSubject(this.getRoomStream());
    }

    getRoomList() {
        return this.room$;
    }

    getRoomLoadList(room: string) {
        const loadList = LOAD.filter(load => load.roomId === room);
        return of(loadList);
    }

    changeRoomName(originalName: string, newName: string) {
        if (originalName === newName) {
            return of(ROOM);
        }
        const roomIndex = ROOM.findIndex(room => room === originalName);
        if (roomIndex === -1) {
            return throwError('room does not exist');
        }
        const newRoomExist = ROOM.findIndex(room => room === newName);
        if (newRoomExist !== -1) {
            return throwError(`room name (${newName}) already exists`);
        }
        ROOM[roomIndex] = newName;

        this.numberOfDevice.set(newName, this.numberOfDevice.get(originalName));
        this.numberOfDevice.delete(originalName);
        this.room$.next(this.getRoomStream());
        return of(ROOM);
    }

    getRoomStream() {
        return Array.from(this.numberOfDevice, ([key, value]) => ({
            room: key,
            count: value,
        }));
    }
}
