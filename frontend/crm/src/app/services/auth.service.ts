import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, LoginResponse } from '../interfaces/login.interface';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = environment.apiUrl // Replace with your backend API

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /** Login method */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    console.log("API URL: ", this.apiUrl)
    return this.http.post<LoginResponse>(`${this.apiUrl}users/login`, credentials).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storeAuthData(response.data.token, response.data.user, credentials.rememberMe);
          this.currentUserSubject.next(response.data.user);
        } else {
          this.currentUserSubject.next(null);
        }
      })
    );
  }

  /** Logout method */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  /** Store tokens and user */
  private storeAuthData(token: string, user: User, rememberMe?: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
  }

  /** Get token */
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  /** Check authentication state */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** Get current user */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
