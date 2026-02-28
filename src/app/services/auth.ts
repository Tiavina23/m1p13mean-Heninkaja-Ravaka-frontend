import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5000/api/users/login';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email, password });
  }

  saveAuthData(token: string, role: string) {
    if (this.isBrowser()) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
    }
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem('role');
    }
    return null;
  }

  logout() {
    if (this.isBrowser()) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
    }
  }
}