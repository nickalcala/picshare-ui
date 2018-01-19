import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { StorageService } from "./storage.service";

@Injectable()
export class SessionService {

    private _currentUser: Login;

    constructor(
        private storageService: StorageService
    ) {

    }

    get currentUser() {
        return this._currentUser;
    }

    set currentUser(login: Login) {
        this.storageService.setItem('login', login);
        this._currentUser = login;
    }

    get isGuest() {
        return this.user() == null;
    }

    user() {
        if (!this._currentUser) {
            let store: any = this.storageService.getItem('login');
            if (!store) {
                return null;
            }
            let login = new Login;
            login.id = store._id;
            login.name = store._name;
            login.email = store._email;
            login.accessToken = store._accessToken;
            this._currentUser = login;
        }
        return this._currentUser;
    }

    flush() {
        this.storageService.removeItem('login');
        this._currentUser = null;
    }
}