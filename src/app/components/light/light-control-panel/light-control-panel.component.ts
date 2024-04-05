import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.levelText = this.getLevelText();
    }

    onToggleChange(checked: boolean): void {
        this.level = checked ? 100 : 0;
        this.levelText = this.getLevelText();
    }

    onLevelChanged(value: number): void {
        this.level = value;
        this.levelText = this.getLevelText();
    }

    getLevelText(): string {
        if (this.light.hasLevel)
            return this.level === 0
                ? this.translate.instant('lighting.off')
                : this.level === 100
                ? this.translate.instant('lighting.on')
                : `${this.level}%`;
        return this.level > 0
            ? this.translate.instant('lighting.on')
            : this.translate.instant('lighting.off');
    }
}
