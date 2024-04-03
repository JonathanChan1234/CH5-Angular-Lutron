import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

@Component({
    selector: 'app-av-remote-portrait',
    templateUrl: './av-remote-portrait.component.html',
    styleUrls: ['./av-remote-portrait.component.scss'],
})
export class AvRemotePortraitComponent implements OnInit {
    @Input()
    av: Av;

    pulse = pulse;

    constructor() {}

    ngOnInit(): void {}
}
