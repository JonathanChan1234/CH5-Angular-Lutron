import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-scene-dialog',
    templateUrl: './create-scene-dialog.component.html',
})
export class CreateSceneDialogComponent implements OnInit {
    formControl: FormControl;

    constructor(public dialogRef: MatDialogRef<CreateSceneDialogComponent>) {}

    ngOnInit(): void {
        this.formControl = new FormControl('', Validators.required);
    }

    createScene() {
        if (!this.formControl.valid) {
            alert('Please fill in the scene name');
            return;
        }
        this.dialogRef.close(this.formControl.value);
    }

    close() {
        this.dialogRef.close();
    }
}
