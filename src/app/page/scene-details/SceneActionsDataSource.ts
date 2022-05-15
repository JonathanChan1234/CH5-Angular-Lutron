import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SceneAction } from 'src/app/model/action';
import { SceneService } from 'src/app/service/scene/scene.service';

export class SceneActionsDataSource implements DataSource<SceneAction> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private actionSubject = new BehaviorSubject<SceneAction[]>([]);
    private requestSubscription: Subscription;

    constructor(private sceneService: SceneService, private sceneId: string) {}

    connect(collectionViewer: CollectionViewer): Observable<SceneAction[]> {
        return this.actionSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        if (this.requestSubscription) this.requestSubscription.unsubscribe();
        this.loadingSubject.complete();
        this.actionSubject.complete();
    }

    loadActions() {
        if (this.requestSubscription) this.requestSubscription.unsubscribe();
        this.loadingSubject.next(true);
        this.requestSubscription = this.sceneService
            .getSceneActions(this.sceneId)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((scenes) => {
                this.actionSubject.next(scenes);
            });
    }
}
