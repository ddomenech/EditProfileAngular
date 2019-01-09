import { FormGroup } from '@angular/forms';
import { UserProfile } from './_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpoptions: any;

  constructor(private http: HttpClient) { }


// retrive prefile from user logged
  getProfile() {
    return this.http.get<any>(`${environment.apiUrl}profile/`);
  }
  updateProfile(user: UserProfile, file: File) {
    const formdata = new FormData();
    formdata.append('avatar', file, file.name);
    formdata.append('email', user.email);
    formdata.append('first_name', user.first_name);
    formdata.append('last_name', user.last_name);
    formdata.append('name', user.name);
    return this.http.put<any>(user.url, formdata);
  }

  changePassword(user: UserProfile, oldpassword: string, newpassword: string) {
    return this.http.put<any>(`${environment.apiUrl}profile/${user.id}/set_password/`,
      {old_password: oldpassword, new_password: newpassword});
  }
}
