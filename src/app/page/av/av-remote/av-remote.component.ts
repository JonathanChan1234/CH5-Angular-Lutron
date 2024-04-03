import {
    BreakpointObserver,
    Breakpoints,
    MediaMatcher,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Breakpoint } from 'src/app/constant/breakpoints';

@Component({
    selector: 'app-av-remote',
    templateUrl: './av-remote.component.html',
    styleUrls: ['./av-remote.component.scss'],
})
export class AvRemoteComponent implements OnInit {
    breakpoint: Breakpoint = Breakpoint.Mobile;
    Breakpoint = Breakpoint;

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
                const landscapeView =
                    mediaMatcher.matchMedia('(min-width: 960px)');
                const portraitView = mediaMatcher.matchMedia(
                    '(min-width: 600px) and (max-width: 959.99px)'
                );

                this.breakpoint = landscapeView.matches
                    ? Breakpoint.TabletLandscape
                    : portraitView.matches
                    ? Breakpoint.TabletPortrait
                    : Breakpoint.Mobile;
            });
    }

    ngOnInit(): void {}

    onPowerButtonClick(): void {
        console.log('power button clicked');
    }
}
