import {Router} from '@angular/router';
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

@Component({
    template: 'Signing out...'
})
export class LogoutComponent implements OnInit {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.loginService.logout();
        this.router.navigate(['login']);
    }
}