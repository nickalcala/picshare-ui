import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user";

@Injectable()
export class UserService {

    constructor(
        private http: Http
    ) {
    }

    register(user: User, password: string) {
        return this.http.post('register', {
            name: user.name,
            email: user.email,
            password: password
        }).map(response => response.json());
    }
}