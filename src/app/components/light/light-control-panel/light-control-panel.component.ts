import { Component, Input, OnInit } from '@angular/core';
import { Light } from 'src/app/model/light';

@Component({
    selector: 'app-light-control-panel',
    templateUrl: './light-control-panel.component.html',
    styleUrls: ['./light-control-panel.component.scss'],
})
export class LightControlPanelComponent implements OnInit {
    @Input()
    light: Light;

    level = 0;
    levelText = '';

    constructor() {}

    ngOnInit(): void {
        this.levelText = this.getLevelText();
    }

    onLevelChanged(value: number): void {
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

    turnOn(): void {
        this.level = 100;
        this.levelText = this.getLevelText();
    }

    turnOff(): void {
        this.level = 0;
        this.levelText = this.getLevelText();
    }

    getLevelText(): string {
        if (this.light.hasLevel) return `${this.level}%`;
        return this.level > 0 ? 'ON' : 'OFF';
    }
}
