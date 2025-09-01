import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../Services/AuthServiceService';

@Injectable()
export class MyInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    // Clone the request and add the Authorization header if token is available
    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid, redirect to login page
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
