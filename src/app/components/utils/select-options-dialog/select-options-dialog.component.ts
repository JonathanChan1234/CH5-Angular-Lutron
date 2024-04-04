import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-select-options-dialog',
    templateUrl: './select-options-dialog.component.html',
    styleUrls: ['./select-options-dialog.component.scss'],
})
export class SelectOptionsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<SelectOptionsDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { options: { label: string; value: string }[] }
    ) {}

    ngOnInit(): void {}

    onOptionSelected(value: { label: string; value: string }): void {
        this.dialogRef.close(value);
    }
}
