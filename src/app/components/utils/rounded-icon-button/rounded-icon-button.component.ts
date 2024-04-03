import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-rounded-icon-button',
    templateUrl: './rounded-icon-button.component.html',
    styleUrls: ['./rounded-icon-button.component.scss'],
})
export class RoundedIconButtonComponent implements OnInit {
    @Input()
    iconName: string;

    @Input()
    isSvgIcon: boolean = false;

    @Input()
    size: string = '1vh';

    @Output()
    onClick = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
