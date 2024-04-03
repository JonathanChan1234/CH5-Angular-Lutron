import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

@Component({
    selector: 'app-av-custom-dpad',
    templateUrl: './av-custom-dpad.component.html',
    styleUrls: ['./av-custom-dpad.component.scss'],
})
export class AvCustomDpadComponent implements OnInit {
    @Input()
    av: Av;

    @Input()
    size = 250;

    constructor() {}

    ngOnInit(): void {}

    onUpClick(): void {
        if (!this.av?.up) return;
        pulse(this.av.up);
    }

    onDownClick(): void {
        if (!this.av?.down) return;
        pulse(this.av.down);
    }

    onLeftClick(): void {
        if (!this.av?.left) return;
        pulse(this.av.left);
    }

    onRightClick(): void {
        if (!this.av?.right) return;
        pulse(this.av.right);
    }

    onEnterClick(): void {
        if (!this.av?.enter) return;
        pulse(this.av.enter);
    }
}
