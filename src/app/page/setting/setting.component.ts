import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SelectOptionsDialogComponent } from 'src/app/components/utils/select-options-dialog/select-options-dialog.component';
import {
    DarkTheme,
    DataTheme,
    DefaultLang,
    Language,
    LanguageOptions,
    LightTheme,
    Theme,
} from 'src/app/constant/preference';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
    langFormControl: FormControl;
    formSubscription!: Subscription;
    darkModeEnabled = false;
    currentLang: { label: string; value: string } = {
        label: 'English',
        value: 'en',
    };
    version = environment.version;

    constructor(
        private translate: TranslateService,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        const lang = localStorage.getItem(Language);
        this.currentLang = lang ? JSON.parse(lang) : DefaultLang;

        const theme = localStorage.getItem(Theme);
        this.darkModeEnabled = theme ? theme === DarkTheme : false;
    }

    openLanguageSelectionDialog(): void {
        const dialogRef = this.matDialog.open(SelectOptionsDialogComponent, {
            data: { options: LanguageOptions },
            panelClass: 'custom-modalbox',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;
            this.translate.use(result.value);
            this.currentLang = result;
            localStorage.setItem(Language, JSON.stringify(result));
        });
    }

    onThemeChanged({ checked }: MatSlideToggleChange): void {
        this.darkModeEnabled = checked;
        document.body.setAttribute(DataTheme, checked ? DarkTheme : LightTheme);
        localStorage.setItem(Theme, checked ? DarkTheme : LightTheme);
    }

    ngOnDestroy(): void {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }
}
