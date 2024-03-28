import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/model/device';

@Component({
    selector: 'app-av-device',
    templateUrl: './av-device.component.html',
    styleUrls: ['./av-device.component.scss'],
})
export class AvDeviceComponent implements OnInit {
    @Input()
    load!: Device;

    constructor() {}

    ngOnInit(): void {}
}
