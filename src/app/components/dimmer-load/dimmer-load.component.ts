import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { Device } from 'src/app/model/device';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-dimmer-load',
    templateUrl: './dimmer-load.component.html',
    styleUrls: ['./dimmer-load.component.scss'],
})
export class DimmerLoadComponent implements OnInit {
    @Input() load!: Device;
    level$: Observable<number> = of(0);

    constructor(private crestronService: CrestronService) {}

    ngOnInit(): void {
        this.level$ = this.crestronService.getLoadFbById(this.load.id);
    }

    onToggleChange({ checked }: MatSlideToggleChange): void {
        this.changeBrightness(checked ? 100 : 0);
    }

    onSliderChange({ value }: MatSliderChange): void {
        this.changeBrightness(value);
    }

    changeBrightness(value: number): void {
        this.crestronService.setDimmerLevel(this.load.id, value);
    }
}
