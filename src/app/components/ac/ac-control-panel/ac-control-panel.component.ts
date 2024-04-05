import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Ac } from 'src/app/model/ac';

@Component({
    selector: 'app-ac-control-panel',
    templateUrl: './ac-control-panel.component.html',
    styleUrls: ['./ac-control-panel.component.scss'],
    animations: [
        trigger('openClose', [
            state(
                'open',
                style({
                    maxHeight: '700px',
                })
            ),
            state(
                'closed',
                style({
                    maxHeight: '0px',
                    overflow: 'hidden',
                })
            ),
            transition('open => closed', [animate('0.2s')]),
            transition('closed => open', [animate('0.2s')]),
        ]),
    ],
})
export class AcControlPanelComponent implements OnInit {
    @Input()
    ac: Ac;

    showAdvancedMenu = false;

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {}

    toggleShowAdvancedMenu(): void {
        this.showAdvancedMenu = !this.showAdvancedMenu;
    }

    incrementTemperature(): void {
        this.ac.setTemperature++;
    }

    decrementTemperature(): void {
        this.ac.setTemperature--;
    }

    changeMode(mode: string): void {
        this.ac.mode = mode;
    }

    changeFan(mode: string): void {
        this.ac.fan = mode;
    }

    getModeTranslation(mode: string): string {
        return this.translate.instant(`ac.${mode}`);
    }
}
