import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Device } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room.service';

@Component({
    selector: 'app-load-card-header',
    templateUrl: './load-card-header.component.html',
    styleUrls: ['./load-card-header.component.scss'],
})
export class LoadCardHeaderComponent implements OnInit {
    @Input() load!: Device;
    loadType = '';
    editMode = false;
    nameFormControl: FormControl;

    constructor(
        private translateService: TranslateService,
        private roomService: RoomService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(
            this.load.name,
            Validators.required
        );
        this.loadType = `room.${this.load.type}`;
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeDeviceName() {
        const newLoadName = this.nameFormControl.value;
        if (this.load.name === newLoadName) {
            this.editMode = false;
            return;
        }
        this.roomService.changeLoadName(this.load.id, newLoadName).subscribe(
            () => {
                this.editMode = false;
                this.load.name = newLoadName;
                this.snackBar.open(
                    `✔️ ${this.translateService.instant(
                        'room.changeDeviceMessage'
                    )}`,
                    'close',
                    {
                        duration: 2000,
                    }
                );
            },
            (error) => {
                this.snackBar.open(`⚠️${error}`, 'close', { duration: 2000 });
                this.editMode = false;
            }
        );
    }
}
