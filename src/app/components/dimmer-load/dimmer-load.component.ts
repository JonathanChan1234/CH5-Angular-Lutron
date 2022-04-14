import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { DimmerLoad } from 'src/app/service/type';

@Component({
    selector: 'app-dimmer-load',
    templateUrl: './dimmer-load.component.html',
    styleUrls: ['./dimmer-load.component.scss'],
})
export class DimmerLoadComponent implements OnInit {
    @Input() load!: DimmerLoad;
    sliderValue = 0;
    powerState = false;
    editMode = false;

    nameFormControl: FormControl;

    constructor() {}

    ngOnInit(): void {
        this.nameFormControl = new FormControl(this.load.name, Validators.required);
    }

    onToggleChange(): void {
        const level = this.powerState ? 0 : 100;
        this.changeBrightness(level);
    }

    onSliderChange({ value }: MatSliderChange): void {
        if (!value) {
            return;
        }
        this.changeBrightness(value);
    }

    changeBrightness(value: number): void {
        this.sliderValue = value;
        if (this.sliderValue > 0) {
            this.powerState = true;
        } else {
            this.powerState = false;
        }
    }

    changeToEditMode() {
        this.editMode = true;
    }

    changeDeviceName() {
        this.load.name = this.nameFormControl.value;
        this.editMode = false;
    }
}
