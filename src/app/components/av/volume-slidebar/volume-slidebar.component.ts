import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-volume-slidebar',
    templateUrl: './volume-slidebar.component.html',
    styleUrls: ['./volume-slidebar.component.scss'],
})
export class VolumeSlidebarComponent implements OnInit {
    @Input()
    vertical = false;

    constructor() {}

    ngOnInit(): void {}
}
