import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getSceneName, LOAD, SCENE } from './data';
import { Load, Scene, SceneAction } from './type';

@Injectable({
    providedIn: 'root',
})
export class SceneService {
    constructor() {}

    getSceneList(): Observable<Scene[]> {
        return of(SCENE);
    }

    getSceneActions(name: string): Observable<SceneAction[]> {
        const s = SCENE.find(scene => scene.name === name);
        if (!s) {
            return of([]);
        }
        return of(s.actions);
    }

    getSceneLoadList(id: string, room: string): Observable<Load[]> {
        const scene = SCENE.find(s => s.name === id);
        if (!scene) {
            throw new Error('Scene does not exist');
        }
        const loadList = LOAD.filter(
            load => scene.actions.findIndex(action => action.id === load.id) === -1
        ).filter(load => load.roomId === room);
        return of(loadList);
    }

    createNewScene(): Observable<string> {
        const name = getSceneName();
        SCENE.push({ name, actions: [] });
        return of(name);
    }
}
