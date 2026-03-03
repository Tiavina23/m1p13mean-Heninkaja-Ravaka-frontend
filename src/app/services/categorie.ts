import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  // private apiUrl = 'http://localhost:5000/api/categories';
  private apiUrl = `${environment.apiUrl}/api/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categorie);
  }

  deleteCategorie(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }
}