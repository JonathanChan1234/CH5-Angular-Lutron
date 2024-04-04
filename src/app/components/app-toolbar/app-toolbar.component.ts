import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import {
    RouteInfo,
    RouterService,
} from 'src/app/service/router/router.service';

@Component({
    selector: 'app-app-toolbar',
    templateUrl: './app-toolbar.component.html',
    styleUrls: ['./app-toolbar.component.scss'],
})
export class AppToolbarComponent implements OnInit {
    darkModeEnabled = false;
    history$!: Observable<RouteInfo[]>;

    constructor(private readonly router: RouterService) {}

    ngOnInit(): void {
        document.body.setAttribute(
            'data-theme',
            this.darkModeEnabled ? 'dark' : 'light'
        );
        this.history$ = this.router.getCurrentHistory();
    }

    back(): void {
        this.router.pop();
    }

    home(): void {
        this.router.reset();
    }

    onThemeChanged({ checked }: MatSlideToggleChange): void {
        this.darkModeEnabled = checked;
        document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
    }
}
