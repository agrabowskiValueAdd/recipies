import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const  headerName = 'X-API-KEY';
    const headerValue = 'HoA';

    const modifiedReq = req.clone({
      headers: req.headers.set(headerName, headerValue)
    });

    return next.handle(modifiedReq);
  }
}
