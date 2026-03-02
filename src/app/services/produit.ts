import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  // URL de l'API backend
  private API_URL = 'http://localhost:5000/api/produits';

  constructor(private http: HttpClient) {}

  getMyProducts() {
    return this.http.get(`${this.API_URL}/my-products`);
  }

  addProduct(data: any) {
    return this.http.post(`${this.API_URL}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }


}
