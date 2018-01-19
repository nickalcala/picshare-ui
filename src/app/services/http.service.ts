import { Http, ConnectionBackend, RequestOptions, ResponseOptions, RequestOptionsArgs, Headers, Request, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { Login } from "../models/login";
import { environment } from "../../environments/environment.prod";
import { SessionService } from "./session.service";
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

@Injectable()
export class HttpService extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private responseOptions: ResponseOptions,
        private sessionService: SessionService
    ) {
        super(backend, defaultOptions);
    }

    private generateRequestObservable(cb: (options) => Observable<Response>, options) {
        return cb(this.getRequestOptionArgs(options));
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.generateRequestObservable(options => {
            return super.request(url, options);
        }, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.generateRequestObservable(options => {
            return super.get(url, options);
        }, options);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.generateRequestObservable(options => {
            return super.post(url, body, options);
        }, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.generateRequestObservable(options => {
            return super.put(url, body, options);
        }, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.generateRequestObservable(options => {
            return super.delete(url, options);
        }, options);
    }

    private updateUrl(req: string) {
        return environment.apiEndpoint + '/api/' + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (this.sessionService.currentUser instanceof Login) {
            options.headers.append('Authorization', 'Bearer ' + this.sessionService.currentUser.accessToken);
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }
}