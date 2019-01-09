import { UserProfile } from './_models/user';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }

  login(username: string, password: string)  {
      return this.http.post<any>(`${environment.apiUrl}api-token-auth/`, {username: username, password: password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('CurrentUser', JSON.stringify(user));
        }
        console.log(`${JSON.stringify(user)}`);
        return user;
     }));
  }

  public logout() {
    localStorage.removeItem('CurrentUser');
  }
}
