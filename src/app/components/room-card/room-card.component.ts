import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Room } from 'src/app/model/room';
import { AppService } from 'src/app/service/app/app.service';
import { RoomService } from 'src/app/service/room/room.service';
import { PAGE_ROOM_VIEW } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
    @Input()
    room: Room;

    count = 0;
    editMode = false;
    nameFormControl: FormControl;

    constructor(
        private translationService: TranslateService,
        private router: RouterService,
        private roomService: RoomService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(
            this.room.name,
            Validators.required
        );
        this.count = this.room.devices.length;
    }

    editRoom() {
        this.editMode = true;
    }

    changeRoomName() {
        if (!this.nameFormControl.valid) {
            this.appService.showSnackBarMsg({
                msg: 'Please fill in the name field',
                type: 'error',
            });
            return;
        }
        const newRoomName = this.nameFormControl.value;
        if (this.room.name === newRoomName) {
            this.editMode = false;
            return;
        }
        this.roomService.changeRoomName(this.room.id, newRoomName).subscribe(
            () => {
                this.appService.showSnackBarMsg({
                    msg: `${this.translationService.instant(
                        'room.changeRoomMessage'
                    )}`,
                    type: 'success',
                });
                this.room.name = newRoomName;
                this.editMode = false;
            },
            (error) => {
                this.editMode = false;
                this.appService.showSnackBarMsg({
                    msg: error.message,
                    type: 'error',
                });
                this.nameFormControl.setValue(this.room.name);
            }
        );
    }

    navigateRoom() {
        this.router.navigate(PAGE_ROOM_VIEW, { name: this.room.name });
    }
}
