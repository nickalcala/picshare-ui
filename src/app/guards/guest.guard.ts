import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService
    ) { }

    canActivate() {
        if (!this.sessionService.isGuest) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}