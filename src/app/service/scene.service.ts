import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    DimmerAction,
    MotorAction,
    SceneAction,
    SwitchAction,
} from '../model/action';
import { Device } from '../model/device';
import { Scene } from '../model/scene';

@Injectable({
    providedIn: 'root',
})
export class SceneService {
    constructor(private httpClient: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Error at RoomService; Client Side:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            console.error(
                `Error at SceneService; Backend returned code ${error.status}, body was: `,
                error.error.message
            );
        }
        return throwError(new Error(`${error.error.message}`));
    }

    getSceneList(): Observable<Scene[]> {
        return this.httpClient
            .get<Scene[]>('/scene')
            .pipe(catchError(this.handleError));
    }

    getSceneActions(id: string): Observable<SceneAction[]> {
        return this.httpClient
            .get<SceneAction[]>(`/scene/${id}/actions`)
            .pipe(catchError(this.handleError));
    }

    createNewScene(name: string): Observable<Scene> {
        return this.httpClient
            .post<Scene>('/scene', { name })
            .pipe(catchError(this.handleError));
    }

    changeSceneName(id: string, name: string): Observable<Scene> {
        return this.httpClient
            .put<Scene>(`/scene/${id}`, { name })
            .pipe(catchError(this.handleError));
    }

    deleteScene(id: string): Observable<Scene[]> {
        return this.httpClient
            .delete<Scene[]>(`/scene/${id}`)
            .pipe(catchError(this.handleError));
    }

    getSceneLoadList(sceneId: string, room: string): Observable<Device[]> {
        return this.httpClient
            .get<Device[]>(`/scene/${sceneId}/devices?room=${room}`)
            .pipe(catchError(this.handleError));
    }

    addDimmerActionToScene(
        sceneId: string,
        action: DimmerAction
    ): Observable<DimmerAction> {
        return this.httpClient
            .post<DimmerAction>(`/scene/${sceneId}/action/dimmer`, action)
            .pipe(catchError(this.handleError));
    }

    addSwitchActionToScene(
        id: string,
        action: SwitchAction
    ): Observable<SceneAction> {
        return of(null);
    }

    addMotorActionToScene(
        id: string,
        action: MotorAction
    ): Observable<SceneAction> {
        return of(null);
    }

    deleteActionFromScene(actionId: string): Observable<SceneAction> {
        return this.httpClient
            .delete<SceneAction>(`/scene/action/${actionId}`)
            .pipe(catchError(this.handleError));
    }
}
