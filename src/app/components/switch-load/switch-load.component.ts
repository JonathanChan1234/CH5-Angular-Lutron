import { Component, Input, OnInit } from '@angular/core';
import { SwitchLoad } from 'src/app/service/type';

@Component({
    selector: 'app-switch-load',
    templateUrl: './switch-load.component.html',
    styleUrls: ['./switch-load.component.scss'],
})
export class SwitchLoadComponent implements OnInit {
    @Input() load: SwitchLoad;
    powerState = false;

    constructor() {}

    ngOnInit(): void {}

    onToggleChange() {
        this.powerState = !this.powerState;
    }
}
