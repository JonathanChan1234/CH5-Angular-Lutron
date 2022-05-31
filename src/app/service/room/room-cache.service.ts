import { Injectable } from '@angular/core';
import { Room } from 'src/app/model/room';
import { CacheService } from '../cache/cache.service';

@Injectable({
    providedIn: 'root',
})
export class RoomCacheService extends CacheService<Room[]> {}
