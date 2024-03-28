import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Device } from 'src/app/model/device';

declare var CrComLib: any;

@Component({
    selector: 'app-dimmer-load',
    templateUrl: './dimmer-load.component.html',
    styleUrls: ['./dimmer-load.component.scss'],
})
export class DimmerLoadComponent implements OnInit, OnDestroy {
    @Input() load!: Device;
    level = 0;
    subscriptionId?: string;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.subscriptionId = CrComLib.subscribeState(
            'n',
            this.load.joinId.toString(),
            this.onFeedbackReceived.bind(this)
        );
    }

    onFeedbackReceived(value: number) {
        this.level = value;
        this.changeDetectorRef.detectChanges();
    }

    onToggleChange({ checked }: MatSlideToggleChange): void {
        this.setBrightness(checked ? 100 : 0);
    }

    onSliderChange({ value }: MatSliderChange): void {
        this.setBrightness(value);
    }

    setBrightness(value: number): void {
        CrComLib.publishEvent('n', this.load.joinId.toString(), value);
    }

    ngOnDestroy(): void {
        if (!this.subscriptionId) return;
        CrComLib.unsubscribeState(
            'n',
            this.load.toString(),
            this.subscriptionId
        );
    }
}
