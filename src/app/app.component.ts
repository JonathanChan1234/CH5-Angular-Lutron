import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { icons } from './constant/custom-icons';
import { DataTheme, Language, Theme } from './constant/preference';
import { Route } from './service/router/route';
import { RouterService } from './service/router/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
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
    ngAfterViewInit(): void {
        const theme = localStorage.getItem(Theme);
        if (theme) {
            document.body.setAttribute(DataTheme, theme);
        }
    }

    ngOnInit(): void {
        this.route$ = this.routerService
            .getCurrentRoute()
            .pipe(map((info) => info.route));
        const lang = localStorage.getItem(Language);
        if (lang) {
            this.translate.use(JSON.parse(lang).value);
        }
    }

    navigate(route: Route) {
        this.routerService.navigate(route);
    }
}
