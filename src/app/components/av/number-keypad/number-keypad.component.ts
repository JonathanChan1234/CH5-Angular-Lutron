import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-number-keypad',
    templateUrl: './number-keypad.component.html',
    styleUrls: ['./number-keypad.component.scss'],
})
export class NumberKeypadComponent implements OnInit {
    @Input()
    size: 'small' | 'medium' | 'large' = 'large';

    constructor() {}

    ngOnInit(): void {}
}
