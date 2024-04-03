import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-updown-button-group',
    templateUrl: './updown-button-group.component.html',
    styleUrls: ['./updown-button-group.component.scss'],
})
export class UpdownButtonGroupComponent implements OnInit {
    @Input()
    label: string;

    @Output()
    onUpButtonCilck = new EventEmitter();

    @Output()
    onDownButtonClick = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    upButtonClick(): void {
        this.onUpButtonCilck.emit();
    }

    downButtonClick(): void {
        this.onDownButtonClick.emit();
    }
}
