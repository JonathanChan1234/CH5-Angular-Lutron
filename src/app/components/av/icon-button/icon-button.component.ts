import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
    @Input()
    icon: string;

    @Output()
    click = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {
        this.click.emit();
    }
}
