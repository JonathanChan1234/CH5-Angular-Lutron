import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-function-button',
    templateUrl: './function-button.component.html',
    styleUrls: ['./function-button.component.scss'],
})
export class FunctionButtonComponent implements OnInit {
    @Input()
    backgroundColor: string;

    constructor() {}

    ngOnInit(): void {}
}
