import { HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export function JwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const authService = inject(AuthService);
    const messageService = inject(MessageService);
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Clone the request and attach the token to the Authorization header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              authService.logout();
            }
            messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            return throwError(() => error);
        })
    );
}

