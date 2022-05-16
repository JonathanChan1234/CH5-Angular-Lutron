import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './service/app/app.service';
import { RouterService } from './service/router/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    defaultLang: 'en' | 'zh' | 'jp';
    visible = false;
    route$: Observable<string>;

    langForm: FormControl;

    langSubscription: Subscription;
    appSubscription: Subscription;

    constructor(
        private routerService: RouterService,
        private appService: AppService,
        private translate: TranslateService,
        private snackBar: MatSnackBar
    ) {
        this.defaultLang = 'en';
        translate.setDefaultLang(this.defaultLang);
        this.langForm = new FormControl(this.defaultLang);
    }

    ngOnInit(): void {
        this.route$ = this.routerService
            .getCurrentRoute()
            .pipe(map((info) => info.path));

        this.langSubscription = this.langForm.valueChanges.subscribe(
            (value) => {
                this.translate.use(value);
            }
        );
        this.appSubscription = this.appService.snackBarMsg$.subscribe((msg) => {
            this.snackBar.open(
                msg.type === 'success' ? `✔️ ${msg.msg}` : `⚠️ ${msg.msg}`,
                'close',
                { duration: 2000 }
            );
        });
    }

    showModal() {
        this.visible = true;
    }

    hideModal() {
        this.visible = false;
    }

    navigate(route: string) {
        this.routerService.navigate(route);
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
    }
}
