import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.levelText = this.getLevelText();
    }

    sliderValueChanged(value: number): void {
        this.level = value;
        this.levelText = this.getLevelText();
    }

    open(): void {
        this.level = 100;
        this.levelText = this.getLevelText();
    }

    close(): void {
        this.level = 0;
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
            ? this.translate.instant('shade.closed')
            : this.level === 100
            ? this.translate.instant('shade.open')
            : `${this.level}% ${this.translate.instant('shade.open')}`;
    }
}
