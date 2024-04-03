import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

@Component({
    selector: 'app-av-option-bar',
    templateUrl: './av-option-bar.component.html',
    styleUrls: ['./av-option-bar.component.scss'],
})
export class AvOptionBarComponent implements OnInit {
    @Input()
    fontSize = 20;

    @Input()
    av: Av;

    constructor() {}

    ngOnInit(): void {}

    onPowerButtonClick(): void {
        if (!this.av?.power) return;
        pulse(this.av.power);
    }

    onMenuButtonClick(): void {
        if (!this.av?.menu) return;
        pulse(this.av.menu);
    }

    onCancelButtonClick(): void {
        if (!this.av?.cancel) return;
        pulse(this.av.cancel);
    }

    onInfoButtonClick(): void {
        if (!this.av?.info) return;
        pulse(this.av.info);
    }
}
