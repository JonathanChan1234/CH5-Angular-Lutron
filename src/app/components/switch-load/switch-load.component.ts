import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Device } from 'src/app/model/device';

declare var CrComLib: any;

@Component({
    selector: 'app-switch-load',
    templateUrl: './switch-load.component.html',
    styleUrls: ['./switch-load.component.scss'],
})
export class SwitchLoadComponent implements OnInit, OnDestroy {
    @Input() load: Device;
    power = false;
    subscriptionId?: string;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.subscriptionId = CrComLib.subscribeState(
            'n',
            this.load.joinId.toString(),
            this.onFeedbackReceived.bind(this)
        );
    }

    onFeedbackReceived(level: number) {
        this.power = level > 0;
        this.changeDetectorRef.detectChanges();
    }

    onToggleChange({ checked }: MatSlideToggleChange) {
        CrComLib.publishEvent(
            'n',
            this.load.joinId.toString(),
            checked ? 100 : 0
        );
    }

    ngOnDestroy(): void {
        if (!this.subscriptionId) return;
        CrComLib.unsubscribeState(
            'n',
            this.load.joinId.toString(),
            this.subscriptionId
        );
    }
}
