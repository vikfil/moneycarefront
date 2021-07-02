import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Path} from '../paths';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_ROLE = 'userRole';

  public email: string;
  public password: string;

  constructor(private http: HttpClient) {
  }

  authenticate(email: string, password: string) {
    return this.http.get<any>(`${Path.backEndUrl}/security/login`,
      {headers: {authorization: this.createBasicAuthToken(email, password)}}).pipe(map((res) => {
      this.email = email;
      this.registerSuccessfulLogin(email, res.principal.authorities[0].authority);
    }));
  }

  createBasicAuthToken(email: string, password: string) {
    return 'Basic ' + btoa(email + ':' + password);
  }

  registerSuccessfulLogin(email, role) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email);
    sessionStorage.setItem(this.USER_ROLE, role);
  }

  logout() {
    this.http.post(`${Path.backEndUrl}/logout`, {}).subscribe();
    sessionStorage.clear();
    this.email = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  isManager() {
    const user = sessionStorage.getItem(this.USER_ROLE);
    return user === 'MANAGER';
  }
}
