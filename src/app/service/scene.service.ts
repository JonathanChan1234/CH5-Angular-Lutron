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

    deleteScene(id: string): Observable<Scene[]> {
        const sceneIndex = SCENE.findIndex(s => s.name === id);
        if (sceneIndex === -1) {
            throw new Error(`Scene (${id}) does not exist`);
        }
        SCENE.splice(sceneIndex, 1);
        return of(SCENE);
    }

    addActionToScene(id: string, action: SceneAction): Observable<Scene> {
        const scene = SCENE.find(s => s.name === id);
        if (!scene) {
            throw new Error(`Scene (${id}) does not exist`);
        }
        scene.actions.push(action);
        return of(scene);
    }

    deleteActionFromScene(id: string, action: SceneAction): Observable<SceneAction[]> {
        const scene = SCENE.find(s => s.name === id);
        if (!scene) {
            throw new Error(`Scene (${id}) does not exist`);
        }
        const deleteActionIndex = scene.actions.findIndex(a => a.id === action.id);
        scene.actions.splice(deleteActionIndex, 1);
        return of(scene.actions);
    }
}
