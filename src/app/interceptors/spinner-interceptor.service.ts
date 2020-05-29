import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

    constructor(private _spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('https://free-nba.p.rapidapi.com/players?search=') &&
            !req.url.includes('http://localhost:3001/team-name')) {
            this._spinnerService.changeSpinnerState();
            return next.handle(req).pipe(
                finalize(() => {
                    this._spinnerService.changeSpinnerState();
                })
            );
        } else {
            return next.handle(req);
        }
    }
}