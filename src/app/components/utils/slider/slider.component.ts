import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnChanges {
    @Input()
    width: string;

    @Input()
    value: number;

    @Output()
    onValueChanged = new EventEmitter<number>();

    background: string;

    constructor() {}

    ngOnInit(): void {
        this.background = `linear-gradient(to right, #fff455 ${this.value}%, #ccc ${this.value}%)`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.background = `linear-gradient(to right, #fff455 ${this.value}%, #ccc ${this.value}%)`;
    }

    sliderValueChanged(event: Event): void {
        this.onValueChanged.emit(Number.parseInt(event.target['value']));
        this.background = `linear-gradient(to right, #fff455 ${this.value}%, #ccc ${this.value}%)`;
    }
}
