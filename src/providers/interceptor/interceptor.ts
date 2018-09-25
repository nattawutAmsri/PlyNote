import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const changedReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(changedReq);
  }

  constructor(public http: HttpClient) {
    console.log("Hello InterceptorProvider Provider");
  }
}
