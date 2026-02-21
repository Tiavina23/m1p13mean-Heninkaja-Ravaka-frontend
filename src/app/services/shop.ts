import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = 'http://localhost:5000/api/shop';

  constructor(private http: HttpClient) {}

  getShop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addShop(shop: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, shop);
  }
}