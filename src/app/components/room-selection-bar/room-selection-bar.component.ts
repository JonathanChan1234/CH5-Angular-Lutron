import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomSelectionDialogComponent } from '../room-selection-dialog/room-selection-dialog.component';

@Component({
    selector: 'app-room-selection-bar',
    templateUrl: './room-selection-bar.component.html',
    styleUrls: ['./room-selection-bar.component.scss'],
})
export class RoomSelectionBarComponent implements OnInit {
    currentRoom: string = 'Living Room';

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    openRoomSelectionDialog(): void {
        const dialogRef = this.dialog.open(RoomSelectionDialogComponent, {
            panelClass: 'custom-modalbox',
        });
        dialogRef.afterClosed().subscribe((room) => {
            if (!room) return;
            this.currentRoom = room;
        });
    }
}
