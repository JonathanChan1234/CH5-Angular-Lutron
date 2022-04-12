import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-modal-without-join',
    templateUrl: './modal-without-join.component.html',
    styleUrls: ['./modal-without-join.component.scss'],
})
export class ModalWithoutJoinComponent implements OnInit {
    @Input()
    visible = false;
    @Output() hideModal = new EventEmitter<void>();

    constructor() {}

    ngOnInit(): void {}

    show() {
        this.visible = true;
    }
    hide() {
        this.hideModal.emit();
    }
}
