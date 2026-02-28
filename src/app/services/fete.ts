import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { Observable } from 'rxjs';

export interface Fete {
  _id?: string;
  nom: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class FeteService {
  API = 'http://localhost:5000/api/fetes';

  constructor(private http: HttpClient, private auth: Auth) {}

  private headers() {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` }) };
  }

  getFetes(): Observable<Fete[]> {
    return this.http.get<Fete[]>(this.API,this.headers());
  }
}
