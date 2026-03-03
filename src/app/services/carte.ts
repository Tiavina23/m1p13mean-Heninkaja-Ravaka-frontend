import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarteService {
  private readonly API = 'http://localhost:5000/api/carte';

  constructor(private http: HttpClient) {}

  // Récupère la liste des produits avec calculs de promo déjà faits par le back
  getCarte(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
}