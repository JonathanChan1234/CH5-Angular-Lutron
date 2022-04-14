import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-error-message-bar',
    templateUrl: './error-message-bar.component.html',
    styleUrls: ['./error-message-bar.component.scss'],
})
export class ErrorMessageBarComponent implements OnInit {
    @Input()
    message: string;

    @Output()
    back: EventEmitter<void> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
    backPress() {
        this.back.emit();
    }
}
