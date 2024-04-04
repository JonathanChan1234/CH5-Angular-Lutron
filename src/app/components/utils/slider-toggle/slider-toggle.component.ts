import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-slider-toggle',
    templateUrl: './slider-toggle.component.html',
    styleUrls: ['./slider-toggle.component.scss'],
})
export class SliderToggleComponent implements OnInit {
    @Input()
    checked: boolean;

    @Output()
    onChecked = new EventEmitter<boolean>();

    @Input()
    size: 'big' | 'medium' | 'small' = 'small';

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .subscribe((result) => {
                if (result.breakpoints['(max-width: 599.99px)']) {
                    this.size = 'small';
                } else if (
                    result.breakpoints[
                        '(min-width: 600px) and (max-width: 959.99px)'
                    ]
                ) {
                    this.size = 'medium';
                } else {
                    this.size = 'big';
                }
            });
    }

    ngOnInit(): void {}
}
