import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-validation.html',
  styleUrls: ['./shop-validation.css'],
})
export class ShopValidation {
  pendingShops: any[] = [];
  validatedShops: any[] = [];
  message = '';
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadShops();
  }

  loadShops() {
    this.adminService.getAllShops().subscribe({
      next: (data: any) => {
        this.pendingShops = data.filter((s: any) => !s.isValidated);
        this.validatedShops = data.filter((s: any) => s.isValidated);
      },
      error: (err) => {
        console.error("ERREUR API:", err);
        this.errorMessage = "Impossible de charger les shops.";
      }
    });
  }

  validateShop(id: string) {
    this.adminService.validateShop(id).subscribe({
      next: () => {
        this.message = "Shop validé ✅";
        this.loadShops();
      },
      error: (err) => this.errorMessage = "Impossible de valider."
    });
  }

  deleteShop(id: string) {
    this.adminService.deleteShop(id).subscribe({
      next: () => {
        this.message = "Shop supprimé ❌";
        this.loadShops();
      },
      error: (err) => this.errorMessage = "Impossible de supprimer."
    });
  }
}