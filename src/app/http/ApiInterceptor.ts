import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private excludedUrlsRegex: RegExp[];
    private excludedUrls = ['.svg'];

    constructor() {
        this.excludedUrlsRegex =
            this.excludedUrls.map(
                (urlPattern) => new RegExp(urlPattern, 'i')
            ) || [];
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const passThrough = !!this.excludedUrlsRegex.find((regex) =>
            regex.test(req.url)
        );
        if (passThrough) return next.handle(req);

        const requestUrl = req.url;
        req = req.clone({
            url: environment.url + requestUrl,
        });
        // move to next HttpClient request life cycle
        return next.handle(req);
    }
}
