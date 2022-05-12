import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/model/room';

@Component({
    selector: 'app-motor-load',
    templateUrl: './motor-load.component.html',
    styleUrls: ['./motor-load.component.scss'],
})
export class MotorLoadComponent implements OnInit {
    @Input() load!: Device;

    constructor() {}

    ngOnInit(): void {}
}
