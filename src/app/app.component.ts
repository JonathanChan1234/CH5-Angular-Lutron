import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { icons } from './constant/custom-icons';
import { Route } from './service/router/route';
import { RouterService } from './service/router/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    defaultLang: 'en' | 'zh' | 'jp';
    darkModeEnabled = false;
    route$: Observable<Route>;
    Route = Route;
    appSubscription: Subscription;

    constructor(
        private routerService: RouterService,
        private translate: TranslateService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.defaultLang = 'en';
        translate.setDefaultLang(this.defaultLang);
        icons.forEach((icon) => {
            this.matIconRegistry.addSvgIconInNamespace(
                'custom',
                icon,
                this.domSanitizer.bypassSecurityTrustResourceUrl(
                    `assets/icon/${icon}.svg`
                )
            );
        });
    }

    ngOnInit(): void {
        this.route$ = this.routerService
            .getCurrentRoute()
            .pipe(map((info) => info.route));
    }

    onThemeChanged({ checked }: MatSlideToggleChange): void {
        this.darkModeEnabled = checked;
        document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
    }

    navigate(route: Route) {
        this.routerService.navigate(route);
    }
}
