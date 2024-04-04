import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectOptionsDialogComponent } from '../utils/select-options-dialog/select-options-dialog.component';

@Component({
    selector: 'app-room-selection-bar',
    templateUrl: './room-selection-bar.component.html',
    styleUrls: ['./room-selection-bar.component.scss'],
})
export class RoomSelectionBarComponent implements OnInit {
    currentRoom: string = 'Living Room';
    rooms: string[] = [
        'Living Room',
        'Dining Room',
        'Bedroom 1',
        'Bedroom 2',
        'Master Bedroom',
    ];

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    openRoomSelectionDialog(): void {
        const dialogRef = this.dialog.open(SelectOptionsDialogComponent, {
            panelClass: 'custom-modalbox',
            data: {
                options: this.rooms.map((room) => ({
                    label: room,
                    value: room,
                })),
            },
        });
        dialogRef.afterClosed().subscribe((room) => {
            if (!room) return;
            this.currentRoom = room.value;
        });
    }
}
