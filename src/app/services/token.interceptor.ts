import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  private toExclude: string[] = ["/login", "/register"];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the current request URL matches any of the excluded routes
    if (this.toExclude.some(route => req.url.includes(route))) {
      return next.handle(req); // Don't add Authorization header if route is excluded
    }

    // Otherwise, add the Authorization header if the token exists
    const token = localStorage.getItem('jwt');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}