import { ResponseOptions, XHRBackend, Http, RequestOptions } from '@angular/http';
import { LoginService } from "../services/login.service";
import { HttpService } from '../services/http.service';
import { SessionService } from '../services/session.service';

export function HttpFactory(
    xhrBackend: XHRBackend,
    requestOptions: RequestOptions,
    responseOptions: ResponseOptions,
    sessionService: SessionService
): Http {
    return new HttpService(
        xhrBackend,
        requestOptions,
        responseOptions,
        sessionService
    );
}