import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Path} from '../paths';
import { Observable } from 'rxjs';
import { Expensive } from '../model/expensive';

@Injectable({
    providedIn: 'root'
})
export class ExpensiveService {
    constructor(private http: HttpClient) {}

    public getExpensives(): Observable<Expensive[]> {
        return this.http.get<Expensive[]>(`${Path.backEndUrl}/expensive`);
    }

    public addExpensive(expensive: Expensive): Observable<Expensive> {
        return this.http.post<Expensive>(`${Path.backEndUrl}/expensive`, expensive);
    }

    public updateExpensive(expensive: Expensive): Observable<Expensive> {
        return this.http.put<Expensive>(`${Path.backEndUrl}/expensive`, expensive);
      }

    public deleteExpensive(id: number): Observable<void> {
        return this.http.delete<void>(`${Path.backEndUrl}/expensive/${id}`);
    }
}