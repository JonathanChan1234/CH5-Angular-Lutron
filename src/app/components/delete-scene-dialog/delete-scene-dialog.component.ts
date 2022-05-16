import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-scene-dialog',
    templateUrl: './delete-scene-dialog.html',
})
export class DeleteSceneDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
