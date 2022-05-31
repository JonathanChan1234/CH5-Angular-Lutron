import { Component } from '@angular/core';
import {
    PAGE_ROOMS_PANEL,
    PAGE_SCENE_TABLE,
    PAGE_SETTING,
} from 'src/app/service/router/route';
import { RouterService } from 'src/app/service/router/router.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    children: { label: string; route: string; icon?: string }[] = [
        {
            label: 'navBar.room',
            route: PAGE_ROOMS_PANEL,
            icon: 'brightness_high',
        },
        { label: 'navBar.scene', route: PAGE_SCENE_TABLE, icon: 'memory' },
        { label: 'navBar.setting', route: PAGE_SETTING, icon: 'settings' },
    ];

    constructor(private router: RouterService) {}

    navigate(route: string) {
        this.router.navigate(route);
    }
}
