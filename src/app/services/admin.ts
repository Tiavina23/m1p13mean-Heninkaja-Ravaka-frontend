import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  // private API = 'http://localhost:5000/api/users';
  private API = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) {}

  getPendingShops() {
    return this.http.get<any[]>(`${this.API}/pending-shops`);
  }

  validateShop(id: string) {
    return this.http.put(`${this.API}/validate-shop/${id}`, {});
  }

  getAllShops() {
  return this.http.get<any[]>(`${this.API}/all-shops`);
  }
  deleteShop(id: string) {
  return this.http.delete(`${this.API}/delete-shop/${id}`);
}
}
