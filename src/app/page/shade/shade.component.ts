import { Component, OnInit } from '@angular/core';
import { Shade } from 'src/app/model/shade';

@Component({
    selector: 'app-shade',
    templateUrl: './shade.component.html',
    styleUrls: ['./shade.component.scss'],
})
export class ShadeComponent implements OnInit {
    shades: Shade[] = [
        { name: 'Shade 1', joinNumber: 10, hasLevel: true },
        { name: 'Shade 2', joinNumber: 10, hasLevel: true },
        { name: 'Shade 3', joinNumber: 10, hasLevel: false },
        { name: 'Shade 4', joinNumber: 10, hasLevel: true },
    ];

    constructor() {}

    ngOnInit(): void {}
}
