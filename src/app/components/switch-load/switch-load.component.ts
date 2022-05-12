import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/model/room';

@Component({
    selector: 'app-switch-load',
    templateUrl: './switch-load.component.html',
    styleUrls: ['./switch-load.component.scss'],
})
export class SwitchLoadComponent implements OnInit {
    @Input() load: Device;
    powerState = false;

    constructor() {}

    ngOnInit(): void {}

    onToggleChange() {
        this.powerState = !this.powerState;
    }
}
