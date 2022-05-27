import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/model/device';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-switch-load',
    templateUrl: './switch-load.component.html',
    styleUrls: ['./switch-load.component.scss'],
})
export class SwitchLoadComponent implements OnInit, OnDestroy {
    @Input() load: Device;
    power = false;
    crestronSubscription: Subscription;

    constructor(
        private crestronService: CrestronService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.crestronSubscription = this.crestronService
            .getLoadFbById(this.load.id)
            .subscribe((value) => {
                this.power = value > 0;
                this.changeDetectorRef.detectChanges();
            });
        this.crestronService.askForLoadFb(this.load.id);
    }

    onToggleChange({ checked }: MatSlideToggleChange) {
        this.crestronService.setSwitchLevel(this.load.id, checked);
    }

    ngOnDestroy(): void {
        this.crestronSubscription.unsubscribe();
    }
}
