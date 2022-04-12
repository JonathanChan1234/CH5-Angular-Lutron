import { Component, Input, OnInit } from '@angular/core';
import { MotorLoad } from 'src/app/service/type';

@Component({
    selector: 'app-motor-load',
    templateUrl: './motor-load.component.html',
    styleUrls: ['./motor-load.component.scss'],
})
export class MotorLoadComponent implements OnInit {
    @Input() load!: MotorLoad;

    constructor() {}

    ngOnInit(): void {}
}
