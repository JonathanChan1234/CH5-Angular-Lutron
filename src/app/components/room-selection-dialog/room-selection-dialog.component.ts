import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-room-selection-dialog',
    templateUrl: './room-selection-dialog.component.html',
    styleUrls: ['./room-selection-dialog.component.scss'],
})
export class RoomSelectionDialogComponent implements OnInit {
    rooms: string[] = [
        'Living Room',
        'Dining Room',
        'Kitchen',
        'Bedroom 1',
        'Bedroom 2',
        'Bedroom 3',
        'Master Bedroom',
    ];

    constructor(public dialogRef: MatDialogRef<RoomSelectionDialogComponent>) {}

    ngOnInit(): void {}

    selectCurrentRoom(room: string): void {
        this.dialogRef.close(room);
    }
}
