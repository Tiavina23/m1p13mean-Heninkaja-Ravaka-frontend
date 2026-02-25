import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.API_URL + 'login', data)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('role', res.role);
        })
      );
  }

  register(data: any) {
    return this.http.post(this.API_URL + 'register', data);
  }

  logout() {
    localStorage.clear();
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}