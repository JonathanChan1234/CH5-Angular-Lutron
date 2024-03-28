import { Component, Input } from '@angular/core';
import { Device } from 'src/app/model/device';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-motor-load',
    templateUrl: './motor-load.component.html',
    styleUrls: ['./motor-load.component.scss'],
})
export class MotorLoadComponent {
    @Input() load!: Device;

    constructor(private crestronService: CrestronService) {}

    raise() {
        this.crestronService.setMotorAction(this.load.joinId, 'raise');
    }

    stop() {
        this.crestronService.setMotorAction(this.load.joinId, 'stop');
    }

    lower() {
        this.crestronService.setMotorAction(this.load.joinId, 'lower');
    }
}
