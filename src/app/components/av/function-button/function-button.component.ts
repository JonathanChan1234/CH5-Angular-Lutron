import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-function-button',
    templateUrl: './function-button.component.html',
    styleUrls: ['./function-button.component.scss'],
})
export class FunctionButtonComponent implements OnInit {
    @Input()
    backgroundColor: string;

    @Output()
    onClick = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
