import { Router, NavigationEnd } from '@angular/router';
import { Component, ChangeDetectorRef, Input, OnInit } from "@angular/core";
import { SessionService } from '../../services/session.service';
import { Login } from '../../models/login';

@Component({
    selector: 'tl-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

    login: Login;

    constructor(
        private sessionService: SessionService
    ) {
    }

    ngOnInit() {
        this.login = this.sessionService.currentUser;
    }

    logout() {
    }

}