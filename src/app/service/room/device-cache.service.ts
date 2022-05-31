import { Injectable } from '@angular/core';
import { Device } from 'src/app/model/device';
import { CacheService } from '../cache/cache.service';

@Injectable({
    providedIn: 'root',
})
export class DeviceCacheService extends CacheService<Device[]> {}
