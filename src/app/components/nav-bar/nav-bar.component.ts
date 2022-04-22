import { Component, OnInit } from '@angular/core';
import {
    PAGE_MONITORING,
    PAGE_ROOMS_PANEL,
    PAGE_SCENE_TABLE,
    PAGE_SETTING,
} from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    children: { label: string; route: string; icon?: string }[] = [
        { label: 'navBar.lighting', route: PAGE_ROOMS_PANEL, icon: 'brightness_high' },
        { label: 'navBar.monitoring', route: PAGE_MONITORING, icon: 'video_call' },
        { label: 'navBar.scene', route: PAGE_SCENE_TABLE, icon: 'memory' },
        { label: 'navBar.setting', route: PAGE_SETTING, icon: 'settings' },
    ];

    constructor(private router: RouterService) {}

    ngOnInit(): void {}
    navigate(route: string) {
        this.router.navigate(route);
    }

    tab1Click() {
        console.log('tab 1 clicked');
    }
}
