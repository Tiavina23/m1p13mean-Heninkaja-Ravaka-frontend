import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← nécessaire pour *ngIf et *ngFor
import { ProduitService } from '../../../services/produit';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.html',
  styleUrls: ['./shop-dashboard.css'],
  standalone: true,          // si tu utilises Angular Standalone Component
  imports: [CommonModule]    // ← ajoute CommonModule ici
})
export class ShopDashboard implements OnInit {

  produits: any[] = [];
  shopName: string = '';
  errorMessage: string = '';

  constructor(
    private produitService: ProduitService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.shopName = user.name;
      this.loadProduits(user.id);
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
    }
  }

  loadProduits(shopId: string) {
    this.produitService.getProduits().subscribe({
      next: (data: any[]) => {
        this.produits = data.filter(p => p.shopId === shopId);
      },
      error: (err) => {
        console.error('Erreur chargement produits', err);
        this.errorMessage = 'Impossible de charger les produits.';
      }
    });
  }
}