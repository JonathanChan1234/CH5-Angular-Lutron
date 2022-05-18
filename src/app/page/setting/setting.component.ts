import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { CrestronService } from 'src/app/service/crestron/crestron.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
    langFormControl: FormControl;
    formSubscription!: Subscription;
    fb: string;
    fb$: Observable<string>;

    constructor(
        private translate: TranslateService,
        private crestronService: CrestronService
    ) {
        this.langFormControl = new FormControl('en', Validators.required);
    }

    ngOnInit(): void {
        this.formSubscription = this.langFormControl.valueChanges.subscribe(
            (lang) => this.translate.use(lang)
        );
        this.fb$ = this.crestronService.getFbLog();
        this.crestronService.getFbLog().subscribe((val) => (this.fb = val));
    }

    ngOnDestroy(): void {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }
}
