// src/app/services/promotion.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PromotionService {
  API = 'http://localhost:5000/api/promotions';

  constructor(private http: HttpClient, private auth: Auth) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  /*addPromotion(promo: any) {
    return this.http.post(this.API, promo, this.headers());
  } */

  createPromotion(data: any) {
      return this.http.post(this.API, data, this.headers());
  }
}