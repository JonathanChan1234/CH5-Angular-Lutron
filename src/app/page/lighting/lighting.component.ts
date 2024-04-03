import {
    BreakpointObserver,
    Breakpoints,
    MediaMatcher,
} from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Light } from 'src/app/model/light';

@Component({
    selector: 'app-lighting',
    templateUrl: './lighting.component.html',
    styleUrls: ['./lighting.component.scss'],
})
export class LightingComponent implements OnInit {
    @Input()
    lights: Light[] = [
        { name: 'Dimmer 1', joinId: 1, hasLevel: true },
        { name: 'Dimmer 2', joinId: 1, hasLevel: false },
        { name: 'Dimmer 3', joinId: 1, hasLevel: true },
        { name: 'Dimmer 4', joinId: 1, hasLevel: false },
    ];

    wideView = false;

    constructor(
        breakpointObserver: BreakpointObserver,
        mediaMatcher: MediaMatcher
    ) {
        breakpointObserver
            .observe([
                Breakpoints.TabletLandscape,
                Breakpoints.TabletPortrait,
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((_) => {
                this.wideView = mediaMatcher.matchMedia(
                    '(min-width: 927.99px)'
                ).matches;
            });
    }

    ngOnInit(): void {}
}
