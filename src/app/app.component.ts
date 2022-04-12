import { Component, OnInit } from '@angular/core';
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

    constructor(private routerService: RouterService) {}

    ngOnInit(): void {
        this.routerService.getCurrentRoute().subscribe(route => {
            this.route = route.path;
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
