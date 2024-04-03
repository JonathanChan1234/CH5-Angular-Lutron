import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

@Component({
    selector: 'app-av-remote-mobile',
    templateUrl: './av-remote-mobile.component.html',
    styleUrls: ['./av-remote-mobile.component.scss'],
})
export class AvRemoteMobileComponent implements OnInit {
    @Input()
    av: Av;

    showNumberKeypad = true;
    pulse = pulse;

    constructor() {}

    ngOnInit(): void {}

    changeKeypad(): void {
        this.showNumberKeypad = !this.showNumberKeypad;
    }
}
