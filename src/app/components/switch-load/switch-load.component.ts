import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, of } from 'rxjs';
import { Device } from 'src/app/model/device';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-switch-load',
    templateUrl: './switch-load.component.html',
    styleUrls: ['./switch-load.component.scss'],
})
export class SwitchLoadComponent implements OnInit {
    @Input() load: Device;
    level$: Observable<number> = of(0);

    constructor(private crestronService: CrestronService) {}

    ngOnInit(): void {
        this.level$ = this.crestronService.getLoadFbById(this.load.id);
    }

    onToggleChange({ checked }: MatSlideToggleChange) {
        this.crestronService.setSwitchLevel(this.load.id, checked);
    }
}
