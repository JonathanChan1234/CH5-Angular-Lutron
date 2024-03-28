import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Device, DeviceType } from 'src/app/model/device';
import { Room } from 'src/app/model/room';
import { RouterService } from 'src/app/service/router/router.service';
import { environment } from 'src/environments/environment';

declare var CrComLib: any;

@Component({
    selector: 'app-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
    name = '';
    subscriptionId!: string;
    devices: Device[] = environment.production
        ? []
        : [{ joinId: 1, name: 'Samsung TV', type: DeviceType.Av }];
    deviceData = '';

    DeviceType = DeviceType;

    constructor(
        private readonly router: RouterService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.name = this.router.getCurrentRouteParams()?.name;
        if (!this.name) {
            alert('This room no longer exists');
            return;
        }
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
        const rooms: Room[] = JSON.parse(value);
        const room = rooms.filter((room) => room.name === this.name);
        this.devices = room.length === 0 ? [] : room[0].devices;
        this.changeDetectorRef.detectChanges();
    }
}
