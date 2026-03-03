import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // Ajouté Output et EventEmitter
import { AdminService } from '../../../services/admin';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-shop-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-validation.html',
  styleUrls: ['./shop-validation.css'],
})
export class ShopValidation implements OnInit {
  pendingShops: any[] = [];
  validatedShops: any[] = [];
  message = '';
  errorMessage = '';

  // Événement pour prévenir l'AdminDashboard (le parent)
  @Output() dataChanged = new EventEmitter<void>();

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef // 2. Injecte
  ) {}

  ngOnInit() {
    this.loadShops();
  }

  loadShops() {
    this.adminService.getAllShops().subscribe({
      next: (data: any) => {
        this.pendingShops = data.filter((s: any) => !s.isValidated);
        this.validatedShops = data.filter((s: any) => s.isValidated);
        this.cdr.detectChanges();
        this.dataChanged.emit();
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
        this.loadShops(); // Recharge localement et émet l'événement via loadShops()
      },
      error: (err) => this.errorMessage = "Impossible de valider."
    });
  }

  deleteShop(id: string) {
    this.adminService.deleteShop(id).subscribe({
      next: () => {
        this.message = "Shop supprimé ❌";
        this.loadShops(); // Recharge localement et émet l'événement via loadShops()
      },
      error: (err) => this.errorMessage = "Impossible de supprimer."
    });
  }
}
