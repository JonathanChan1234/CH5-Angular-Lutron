import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-av-remote-mobile',
    templateUrl: './av-remote-mobile.component.html',
    styleUrls: ['./av-remote-mobile.component.scss'],
})
export class AvRemoteMobileComponent implements OnInit {
    showNumberKeypad = true;

    constructor() {}

    ngOnInit(): void {}

    changeKeypad(): void {
        this.showNumberKeypad = !this.showNumberKeypad;
    }
}
