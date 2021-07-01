import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Path} from '../paths';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) {
  }

  // public getFirst(): Observable<User> {
  //   return this.http.get<User>(`${Path.backEndUrl}/user`);
  //}

//   public postUser(user: User): Observable<User> {
//     return this.http.post<User>(this.config.backBaseUrl + '/user', user);
//   }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${Path.backEndUrl}/security/registration`, user);
  }
  public confirmRegistration(token: string): Observable<string> {
    return this.http.get(`${Path.backEndUrl}/security/registrationConfirm?token=` + token, {responseType: 'text'});
  }

  public resendConfirmationToken(token: string): Observable<string> {
    return this.http.get(`${Path.backEndUrl}security/resendRegistrationToken?token=` + token, {responseType: 'text'});
  }
}
