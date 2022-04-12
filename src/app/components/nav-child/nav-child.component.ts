import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from 'src/app/service/router.service';

@Component({
    selector: 'app-nav-child',
    templateUrl: './nav-child.component.html',
    styleUrls: ['./nav-child.component.scss'],
})
export class NavChildComponent implements OnInit {
    @Input()
    route = '';

    @Input()
    label = '';

    @Input()
    icon = '';

    currentPath = '';

    constructor(private router: RouterService) {}

    ngOnInit(): void {
        this.router.getCurrentRoute().subscribe(route => {
            this.currentPath = route.path;
        });
    }

    navigate() {
        this.router.navigate(this.route);
    }
}
