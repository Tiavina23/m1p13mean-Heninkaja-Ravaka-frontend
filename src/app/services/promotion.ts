import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './../services/auth';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  // private readonly API = 'http://localhost:5000/api/promotions';
  private readonly API = `${environment.apiUrl}/api/promotions`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Injecté pour vérifier Client vs Serveur
  ) {}

  private getHttpOptions() {
    let token = '';
    
    // On ne récupère le token que si on est sur le navigateur
    if (isPlatformBrowser(this.platformId)) {
      token = this.authService.getToken() || '';
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
  }

  createPromotion(data: any): Observable<any> {
    // Empêche l'appel API sur le serveur si le token est absent (évite le 403 en SSR)
    if (!isPlatformBrowser(this.platformId)) {
      return of(null); 
    }
    return this.http.post(this.API, data, this.getHttpOptions());
  }
}