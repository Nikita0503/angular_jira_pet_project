import { CommonService } from './../shared/common.service';
import { AuthService } from './../shared/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private commonService: CommonService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.commonService.setIsLoading(true);
        const token = this.authService.token;
        if(token){
          req = req.clone({
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + token
            })
          })
        }
        return next.handle(req).pipe(tap(
          (event) => {
            if (event instanceof HttpResponse){
              this.commonService.setIsLoading(false)
            }
          },
          (e) => {
            if (e instanceof HttpErrorResponse) {
                this.commonService.setIsLoading(false)
                console.log('error => ', e.error)
            }
          }
        ));
    }
}
