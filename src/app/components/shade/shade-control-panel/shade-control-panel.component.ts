import { Component, Input, OnInit } from '@angular/core';
import { Shade } from 'src/app/model/shade';

@Component({
    selector: 'app-shade-control-panel',
    templateUrl: './shade-control-panel.component.html',
    styleUrls: ['./shade-control-panel.component.scss'],
})
export class ShadeControlPanelComponent implements OnInit {
    @Input()
    shade: Shade;

    level: number = 0;
    levelText = ``;

    constructor() {}

    ngOnInit(): void {
        this.levelText = this.getLevelText();
    }

    sliderValueChanged(value: number): void {
        this.level = value;
        this.levelText = this.getLevelText();
    }

    incrementLevel(): void {
        if (this.level >= 100) return;
        this.level++;
        this.levelText = this.getLevelText();
    }

    decrementLevel(): void {
        if (this.level <= 0) return;
        this.level--;
        this.levelText = this.getLevelText();
    }

    getLevelText(): string {
        return this.level === 0
            ? 'Closed'
            : this.level === 100
            ? 'Open'
            : `${this.level}%`;
    }
}
