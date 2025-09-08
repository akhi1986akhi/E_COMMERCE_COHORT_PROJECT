import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }


  userData() {

    return this.http.get(this.apiUrl + "users/me", {
      withCredentials: true   // 👈 ensures cookies are sent
    });
  }
}
