import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RouterService } from './service/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'crcom-basic';
    visible = false;
    route = '';

    langForm: FormControl;

    constructor(private routerService: RouterService, private translate: TranslateService) {
        translate.setDefaultLang('jp');
        this.langForm = new FormControl('jp');
    }

    ngOnInit(): void {
        this.routerService.getCurrentRoute().subscribe(route => {
            this.route = route.path;
        });
        this.langForm.valueChanges.subscribe(value => {
            this.translate.use(value);
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
}
