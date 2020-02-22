import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

    public get(url): Observable<any> {
        return this.http.get(url).pipe(catchError(this.handleError));
    }

    public post(body: object, url): Observable<any> {
        const bodyString = JSON.stringify(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(url, bodyString, { headers }).pipe(catchError(this.handleError));
    }

    public put(body: object, url): Observable<any> {
        const bodyString = JSON.stringify(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.put(url, bodyString, { headers }).pipe(catchError(this.handleError));
    }


    public delete(url): Observable<any> {
        return this.http.delete(url).pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        return throwError(error);
    }

    public getParamterizedUrl(body: object): string {
        let reqData = new HttpParams();
        Object.keys(body).forEach((key) => {
            reqData = reqData.set(key, body[key].toString());
        });
        return '?' + reqData.toString();
    }
}
