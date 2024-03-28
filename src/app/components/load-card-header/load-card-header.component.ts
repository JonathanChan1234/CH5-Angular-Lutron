import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Device, DeviceType } from 'src/app/model/device';
import { AppService } from 'src/app/service/app/app.service';
import { RoomService } from 'src/app/service/room/room.service';

@Component({
    selector: 'app-load-card-header',
    templateUrl: './load-card-header.component.html',
    styleUrls: ['./load-card-header.component.scss'],
})
export class LoadCardHeaderComponent implements OnInit {
    @Input() load!: Device;
    editMode = false;
    nameFormControl: FormControl;
    DeviceType = DeviceType;

    constructor(
        readonly translateService: TranslateService,
        readonly roomService: RoomService,
        readonly appService: AppService
    ) {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(
            this.load.name,
            Validators.required
        );
    }
}
