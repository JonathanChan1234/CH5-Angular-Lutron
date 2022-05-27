import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/model/device';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-dimmer-load',
    templateUrl: './dimmer-load.component.html',
    styleUrls: ['./dimmer-load.component.scss'],
})
export class DimmerLoadComponent implements OnInit, OnDestroy {
    @Input() load!: Device;
    level = 0;
    crestronSubscription: Subscription;

    constructor(
        private crestronService: CrestronService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.crestronSubscription = this.crestronService
            .getLoadFbById(this.load.id)
            .subscribe((value) => {
                this.level = value;
                this.changeDetectorRef.detectChanges();
            });
        this.crestronService.askForLoadFb(this.load.id);
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

    ngOnDestroy(): void {
        this.crestronSubscription.unsubscribe();
    }
}
