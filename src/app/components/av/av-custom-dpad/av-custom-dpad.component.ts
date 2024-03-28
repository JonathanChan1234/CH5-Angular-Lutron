import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-av-custom-dpad',
    templateUrl: './av-custom-dpad.component.html',
    styleUrls: ['./av-custom-dpad.component.scss'],
})
export class AvCustomDpadComponent implements OnInit {
    @Input()
    size = 250;

    constructor() {}

    ngOnInit(): void {}
}
