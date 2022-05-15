import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type SnackBarMsg = {
    msg: string;
    type: 'success' | 'error';
};

@Injectable({
    providedIn: 'root',
})
export class AppService {
    snackBarMsg$ = new Subject<SnackBarMsg>();

    constructor() {}

    showSnackBarMsg(msg: SnackBarMsg) {
        this.snackBarMsg$.next(msg);
    }
}
