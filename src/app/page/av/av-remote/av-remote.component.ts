import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver
            .observe([Breakpoints.TabletLandscape])
            .subscribe((result) => {
                if (result.matches)
                    this.breakpoint = Breakpoint.TabletLandscape;
            });
        breakpointObserver
            .observe([Breakpoints.TabletPortrait])
            .subscribe((result) => {
                if (result.matches) this.breakpoint = Breakpoint.TabletPortrait;
            });
        breakpointObserver.observe([Breakpoints.XSmall]).subscribe((result) => {
            if (result.matches) this.breakpoint = Breakpoint.Mobile;
        });
    }

    ngOnInit(): void {}
}
