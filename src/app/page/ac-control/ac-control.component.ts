import { Component, Input, OnInit } from '@angular/core';
import { Ac } from 'src/app/model/ac';

@Component({
    selector: 'app-ac-control',
    templateUrl: './ac-control.component.html',
    styleUrls: ['./ac-control.component.scss'],
})
export class AcControlComponent implements OnInit {
    @Input()
    acs: Ac[] = [
        {
            name: 'AC 1',
            setTemperature: 25,
            roomTemperature: 25,
            modeAvailable: ['off', 'heat', 'cool', 'auto', 'dry'],
            mode: 'off',
            fanAvailable: ['off', 'low', 'medium', 'high'],
            fan: 'off',
        },
        {
            name: 'AC 2',
            setTemperature: 25,
            roomTemperature: 25,
            modeAvailable: ['off', 'heat', 'cool', 'auto', 'dry'],
            mode: 'off',
            fanAvailable: ['off', 'low', 'medium', 'high'],
            fan: 'off',
        },
        {
            name: 'AC 3',
            setTemperature: 25,
            roomTemperature: 25,
            modeAvailable: ['off', 'heat', 'cool', 'auto', 'dry'],
            mode: 'off',
            fanAvailable: ['off', 'low', 'medium', 'high'],
            fan: 'off',
        },
        {
            name: 'AC 4',
            setTemperature: 25,
            roomTemperature: 25,
            modeAvailable: ['off', 'heat', 'cool', 'auto', 'dry'],
            mode: 'off',
            fanAvailable: ['off', 'low', 'medium', 'high'],
            fan: 'off',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
