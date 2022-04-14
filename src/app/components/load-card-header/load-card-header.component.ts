import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Load } from 'src/app/service/type';

@Component({
    selector: 'app-load-card-header',
    templateUrl: './load-card-header.component.html',
    styleUrls: ['./load-card-header.component.scss'],
})
export class LoadCardHeaderComponent implements OnInit {
    @Input() load!: Load;
    editMode = false;
    nameFormControl: FormControl;

    constructor() {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(this.load.name, Validators.required);
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeDeviceName() {
        this.load.name = this.nameFormControl.value;
        this.editMode = false;
    }
}
