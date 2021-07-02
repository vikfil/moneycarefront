import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Path} from '../paths';
import { Observable } from 'rxjs';
import { Income } from '../model/income';

@Injectable({
    providedIn: 'root'
})
export class IncomeService {
    constructor(private http: HttpClient) {}

    public getIncomes(): Observable<Income[]> {
        return this.http.get<Income[]>(`${Path.backEndUrl}/income`);
    }

    public addIncome(income: Income): Observable<Income> {
        return this.http.post<Income>(`${Path.backEndUrl}/income`, income);
    }

    public updateIncome(income: Income): Observable<Income> {
        return this.http.put<Income>(`${Path.backEndUrl}/income`, income);
      }

    public deleteIncome(id: number): Observable<void> {
        return this.http.delete<void>(`${Path.backEndUrl}/income/${id}`);
    }
}
