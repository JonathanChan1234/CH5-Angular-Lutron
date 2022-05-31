import { Injectable } from '@angular/core';
import { Scene } from 'src/app/model/scene';
import { CacheService } from '../cache/cache.service';

@Injectable({
    providedIn: 'root',
})
export class SceneCacheService extends CacheService<Scene[]> {}
