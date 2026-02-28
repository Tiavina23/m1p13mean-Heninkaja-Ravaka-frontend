import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './../services/auth';


@Injectable({ 
  providedIn: 'root'
})

export class ProduitService {

  API = 'http://localhost:5000/api/produits';

  constructor(private http: HttpClient, private auth: Auth) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  // Liste des produits du shop connecté
  getProduits() {
    return this.http.get<any[]>(this.API , this.headers());
  }

  addProduit(produit: any) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix);
    formData.append('stock', produit.stock);
    formData.append('categorie', produit.categorie);
    if (produit.image) formData.append('image', produit.image);

    return this.http.post(this.API, formData, this.headers());
  }

  updateProduit(id: string, produit: any) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix);
    formData.append('stock', produit.stock);
    formData.append('categorie', produit.categorie);
    if (produit.image) formData.append('image', produit.image);

    return this.http.put(`${this.API}/${id}`, formData, this.headers());
  }

  deleteProduit(id: string) {
    return this.http.delete(`${this.API}/${id}`, this.headers());
  }
}