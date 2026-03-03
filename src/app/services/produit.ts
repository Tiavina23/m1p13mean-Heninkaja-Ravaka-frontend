import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../services/auth';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

export interface Produit {
  _id: string;
  name: string;
  prix: number;
}

@Injectable({ 
  providedIn: 'root'
})

export class ProduitService {

  // API_URL = 'http://localhost:5000/api/produits';
  API_URL = `${environment.apiUrl}/api/produits`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken(); // Récupère le token via ton AuthService
    return new HttpHeaders({
      'x-access-token': token || '' // Vérifie si ton backend attend 'x-access-token' ou 'Authorization'
    });
  }

  // Liste des produits du shop connecté
  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, { headers: this.getHeaders() });
  }


  addProduit(produit: any) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix);
    formData.append('stock', produit.stock);
    formData.append('categorie', produit.categorie);
    if (produit.image) formData.append('image', produit.image);

    return this.http.post(this.API_URL, formData, { headers: this.getHeaders() });
  }

  updateProduit(id: string, produit: any) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix);
    formData.append('stock', produit.stock);
    formData.append('categorie', produit.categorie);
    if (produit.image) formData.append('image', produit.image);

    return this.http.put(`${this.API_URL}/${id}`, formData, { headers: this.getHeaders() });
  }

  deleteProduit(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}