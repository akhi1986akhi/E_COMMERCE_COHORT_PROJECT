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

  getUsers(page: number, limit: number) {
    return this.http.get<{ docs: any[], totalDocs: number, limit: number, totalPages: number, page: number, pagingCounter: number, hasPrevPage: boolean, hasNextPage: boolean, prevPage: number | null, nextPage: number | null }>(this.apiUrl + `users?page=${page}&limit=${limit}`, {
      withCredentials: true   // 👈 ensures cookies are sent
    });
  }
}
