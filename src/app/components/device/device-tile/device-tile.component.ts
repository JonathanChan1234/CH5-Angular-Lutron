import { Component, Input, OnInit } from '@angular/core';
import { DeviceCategory } from 'src/app/constant/device-category';
import { Route } from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';

@Component({
    selector: 'app-device-tile',
    templateUrl: './device-tile.component.html',
    styleUrls: ['./device-tile.component.scss'],
})
export class DeviceTileComponent implements OnInit {
    @Input()
    category: DeviceCategory;

    DeviceCategory = DeviceCategory;

    constructor(private readonly router: RouterService) {}

    ngOnInit(): void {}

    navigate(category: DeviceCategory): void {
        switch (category) {
            case DeviceCategory.Lighting:
                this.router.navigate(Route.LIGHTING);
                break;
            case DeviceCategory.Curtain:
                this.router.navigate(Route.CURTAIN);
                break;
            case DeviceCategory.Ac:
                this.router.navigate(Route.AC_CONTROL);
                break;
            case DeviceCategory.Av:
                this.router.navigate(Route.AV_REMOTE);
                break;
            case DeviceCategory.Settings:
                // this.router.navigate(Route.SETTINGS);
                break;
        }
    }
}
