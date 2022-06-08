import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    BottomNavigation,
    RouterService,
} from 'src/app/service/router/router.service';

@Component({
    selector: 'app-nav-child',
    templateUrl: './nav-child.component.html',
    styleUrls: ['./nav-child.component.scss'],
})
export class NavChildComponent implements OnInit {
    @Input()
    route: BottomNavigation;

    @Input()
    label = '';

    @Input()
    icon = '';

    currentSelection$: BehaviorSubject<BottomNavigation>;

    constructor(private router: RouterService) {}

    ngOnInit(): void {
        this.currentSelection$ = this.router.getCurrentSelection();
    }

    navigate() {
        this.router.changeSelection(this.route);
        this.router.navigate(this.route);
    }
}
