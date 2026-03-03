import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // private apiUrl = 'http://localhost:5000/api/shop';
  private apiUrl = `${environment.apiUrl}/api/shop`;

  constructor(private http: HttpClient) {}

  getShop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addShop(shop: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, shop);
  }
}