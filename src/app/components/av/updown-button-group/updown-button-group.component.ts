import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-updown-button-group',
    templateUrl: './updown-button-group.component.html',
    styleUrls: ['./updown-button-group.component.scss'],
})
export class UpdownButtonGroupComponent implements OnInit {
    @Input()
    label: string;

    constructor() {}

    ngOnInit(): void {}
}
