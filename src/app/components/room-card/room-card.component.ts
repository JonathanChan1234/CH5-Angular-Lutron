import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from 'src/app/service/room.service';
import { PAGE_ROOM_VIEW } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
    @Input()
    name = '';

    @Input()
    count = 0;

    editMode = false;
    nameFormControl: FormControl;

    constructor(
        private router: RouterService,
        private roomService: RoomService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(this.name, Validators.required);
    }

    editRoom() {
        this.editMode = true;
    }

    changeRoomName() {
        if (!this.nameFormControl.valid) {
            this.snackBar.open('The name is not in the right format', 'close', { duration: 2000 });
        }
        const newRoomName = this.nameFormControl.value;
        this.roomService.changeRoomName(this.name, newRoomName).subscribe(
            () => {
                this.editMode = false;
            },
            error => {
                this.snackBar.open(error, 'close', { duration: 2000 });
            }
        );
    }

    navigateRoom() {
        this.router.navigate(PAGE_ROOM_VIEW, { name: this.name });
    }
}
