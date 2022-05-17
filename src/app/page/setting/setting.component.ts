import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
    langFormControl: FormControl;
    formSubscription!: Subscription;

    constructor(private translate: TranslateService) {
        this.langFormControl = new FormControl('en', Validators.required);
    }

    ngOnInit(): void {
        this.formSubscription = this.langFormControl.valueChanges.subscribe(
            (lang) => this.translate.use(lang)
        );
    }

    ngOnDestroy(): void {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }
}
