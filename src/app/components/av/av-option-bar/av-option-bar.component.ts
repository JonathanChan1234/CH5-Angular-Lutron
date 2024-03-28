import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-av-option-bar',
    templateUrl: './av-option-bar.component.html',
    styleUrls: ['./av-option-bar.component.scss'],
})
export class AvOptionBarComponent implements OnInit {
    @Input()
    fontSize = 20;

    constructor() {}

    ngOnInit(): void {}
}
