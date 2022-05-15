import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Scene } from 'src/app/model/scene';
import { SceneService } from 'src/app/service/scene/scene.service';

export class SceneDataSource implements DataSource<Scene> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private sceneSubject = new BehaviorSubject<Scene[]>([]);
    private requestSubscription: Subscription;

    constructor(private sceneService: SceneService) {}

    connect(collectionViewer: CollectionViewer): Observable<Scene[]> {
        return this.sceneSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        if (this.requestSubscription) this.requestSubscription.unsubscribe();
        this.loadingSubject.complete();
        this.sceneSubject.complete();
    }

    loadScene() {
        if (this.requestSubscription) this.requestSubscription.unsubscribe();
        this.loadingSubject.next(true);
        this.requestSubscription = this.sceneService
            .getSceneList()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((scenes) => {
                this.sceneSubject.next(scenes);
            });
    }
}
