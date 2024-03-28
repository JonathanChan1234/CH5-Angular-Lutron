import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-app-toolbar',
    templateUrl: './app-toolbar.component.html',
    styleUrls: ['./app-toolbar.component.scss'],
})
export class AppToolbarComponent implements OnInit {
    darkModeEnabled = true;

    constructor() {}

    ngOnInit(): void {
        document.body.setAttribute(
            'data-theme',
            this.darkModeEnabled ? 'dark' : 'light'
        );
    }

    onThemeChanged({ checked }: MatSlideToggleChange): void {
        this.darkModeEnabled = checked;
        document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
    }
}
