import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private API = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  getPendingShops() {
    return this.http.get(`${this.API}/pending-shops`);
  }

  validateShop(id: string) {
    return this.http.put(`${this.API}/validate-shop/${id}`, {});
  }

  getAllShops() {
  return this.http.get(`${this.API}/all-shops`);
  }
}
