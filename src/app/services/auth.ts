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
    return this.http.post(`${this.API_URL}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
  saveUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return this.getUser()?.accessToken;
  }

}