import { Component, OnInit } from '@angular/core';
import { DeviceCategory } from 'src/app/constant/device-category';

@Component({
    selector: 'app-device-overview',
    templateUrl: './device-overview.component.html',
    styleUrls: ['./device-overview.component.scss'],
})
export class DeviceOverviewComponent implements OnInit {
    constructor() {}

    cateogories: DeviceCategory[] = [
        DeviceCategory.Lighting,
        DeviceCategory.Curtain,
        DeviceCategory.Ac,
        DeviceCategory.Av,
        DeviceCategory.Settings,
    ];

    ngOnInit(): void {}
}
