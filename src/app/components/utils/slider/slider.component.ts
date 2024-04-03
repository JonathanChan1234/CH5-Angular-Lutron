import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    @Input()
    width: string;

    @Input()
    value: number;

    @Output()
    onValueChanged = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}

    sliderValueChanged(event: Event): void {
        this.onValueChanged.emit(Number.parseInt(event.target['value']));
    }
}
