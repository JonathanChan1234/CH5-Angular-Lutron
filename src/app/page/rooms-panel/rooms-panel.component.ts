import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/model/device';
import { Room } from 'src/app/model/room';

declare var CrComLib: any;

@Component({
    selector: 'app-rooms-panel',
    templateUrl: './rooms-panel.component.html',
    styleUrls: ['./rooms-panel.component.scss'],
})
export class RoomsPanelComponent implements OnInit, OnDestroy {
    subscriptionId!: string;
    rooms: Room[] = [
        {
            name: 'Bedroom 1',
            devices: [{ joinId: 1, name: 'Samsung TV', type: DeviceType.Av }],
        },
    ];

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.subscriptionId = CrComLib.subscribeState(
            's',
            '1',
            this.onConfigReceived.bind(this)
        );
    }

    ngOnDestroy(): void {
        if (!this.subscriptionId) return;
        CrComLib.unsubscribeState('s', '1', this.subscriptionId);
    }

    onConfigReceived(value: string) {
        if (!value) return;
        this.rooms = JSON.parse(value);
        this.changeDetectorRef.detectChanges();
    }
}
