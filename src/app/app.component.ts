import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
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
export class AppComponent implements OnInit {
    defaultLang: 'en' | 'zh' | 'jp';
    route$: Observable<string>;
    appSubscription: Subscription;

    constructor(
        private routerService: RouterService,
        private appService: AppService,
        private translate: TranslateService,
        private snackBar: MatSnackBar,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.defaultLang = 'en';
        translate.setDefaultLang(this.defaultLang);
        this.matIconRegistry.addSvgIconInNamespace(
            'custom',
            'switch',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                `assets/icon/switch.svg`
            )
        );
        this.matIconRegistry.addSvgIconInNamespace(
            'custom',
            'curtain',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                `assets/icon/curtain.svg`
            )
        );
    }

    ngOnInit(): void {
        this.route$ = this.routerService
            .getCurrentRoute()
            .pipe(map((info) => info.path));

        this.appSubscription = this.appService.snackBarMsg$.subscribe((msg) => {
            this.snackBar.open(
                msg.type === 'success' ? `✔️ ${msg.msg}` : `⚠️ ${msg.msg}`,
                'close',
                { duration: 2000 }
            );
        });
    }

    navigate(route: string) {
        this.routerService.navigate(route);
    }
}
