import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

@Component({
    selector: 'app-media-keypad',
    templateUrl: './media-keypad.component.html',
    styleUrls: ['./media-keypad.component.scss'],
})
export class MediaKeypadComponent implements OnInit {
    @Input()
    av: Av;

    constructor() {}

    ngOnInit(): void {}

    onFastRewindButtonClick(): void {
        if (!this.av?.fastRewind) return;
        pulse(this.av.fastRewind);
    }

    onFastForwardButtonClick(): void {
        if (!this.av?.fastForward) return;
        pulse(this.av.fastForward);
    }

    onSkipPreviousButtonClick(): void {
        if (!this.av?.skipPrevious) return;
        pulse(this.av.skipPrevious);
    }

    onPlayButtonClick(): void {
        if (!this.av?.play) return;
        pulse(this.av.play);
    }

    onSkipNextButtonClick(): void {
        if (!this.av?.skipNext) return;
        pulse(this.av.skipNext);
    }

    onStopRecordButtonClick(): void {
        if (!this.av?.stopRecord) return;
        pulse(this.av.stopRecord);
    }

    onPauseButtonClick(): void {
        if (!this.av?.pause) return;
        pulse(this.av.pause);
    }

    onStopButtonClick(): void {
        if (!this.av?.stop) return;
        pulse(this.av.stop);
    }
}
