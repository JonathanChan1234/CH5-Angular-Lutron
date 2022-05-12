import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './config';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const requestUrl = req.url;
        req = req.clone({
          url: BASE_URL + requestUrl
        });
        // move to next HttpClient request life cycle
        return next.handle(req);
      }
}
