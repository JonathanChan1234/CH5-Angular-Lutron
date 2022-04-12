import { Component, OnInit } from '@angular/core';
import { PAGE_MONITORING, PAGE_ROOMS_PANEL, PAGE_SCENE_TABLE } from 'src/app/service/route';
import { RouterService } from 'src/app/service/router.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    children: { label: string; route: string; icon?: string }[] = [
        { label: 'Lighting', route: PAGE_ROOMS_PANEL, icon: 'brightness_high' },
        { label: 'Monitoring', route: PAGE_MONITORING, icon: 'video_call' },
        { label: 'Scene', route: PAGE_SCENE_TABLE, icon: 'memory' },
        { label: 'Setting', route: '4', icon: 'settings' },
    ];

    constructor(private router: RouterService) {}

    ngOnInit(): void {}
    navigate(route: string) {
        this.router.navigate(route);
    }
}
