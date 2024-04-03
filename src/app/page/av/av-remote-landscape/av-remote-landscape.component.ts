import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

declare var CrComLib: any;

@Component({
    selector: 'app-av-remote-landscape',
    templateUrl: './av-remote-landscape.component.html',
    styleUrls: ['./av-remote-landscape.component.scss'],
})
export class AvRemoteLandscapeComponent implements OnInit {
    @Input()
    av: Av;

    pulse = pulse;

    constructor() {}

    ngOnInit(): void {}
}
