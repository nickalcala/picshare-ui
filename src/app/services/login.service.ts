import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";

@Injectable()
export class LoginService {

    private _currentUser: Login;

    constructor(
        private http: Http,
        private sessionService: SessionService
    ) {
    }

    login(email, password) {
        return this.http.post('login', {
            email: email,
            password: password
        }).map(response => {
            let json = response.json();
            let login = new Login;
            login.id = json.id;
            login.name = json.name;
            login.email = json.email;
            login.accessToken = json.token;
            this.sessionService.currentUser = login;
            return login;
        });
    }

    logout() {
        this.sessionService.flush();
    }
}