import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarteService {
  // private readonly API = 'http://localhost:5000/api/carte';
    private API = `${environment.apiUrl}/api/carte`;

  constructor(private http: HttpClient) {}

  // Récupère la liste des produits avec calculs de promo déjà faits par le back
  getCarte(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
}