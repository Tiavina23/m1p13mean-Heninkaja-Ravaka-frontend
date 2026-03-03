import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopValidation } from '../shop-validation/shop-validation';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ShopValidation],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  isShopValidationOpen = false;
  shops: any[] = [];       // Liste filtrée pour l'affichage (shops validés)
  pendingShopsCount = 0;   // Compteur pour le bouton notification

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef, // Pour forcer la mise à jour sans clic
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // On charge les données uniquement côté client pour éviter le vide du SSR
    if (isPlatformBrowser(this.platformId)) {
      this.refreshAll();
    }
  }

  refreshAll() {
    this.adminService.getAllShops().subscribe({
      next: (data: any[]) => {
       
        this.shops = data.filter(shop => shop.isValidated === true);
       
        this.pendingShopsCount = data.filter(shop => shop.isValidated === false).length;
       
        this.cdr.detectChanges();
      },
      error: err => console.error("Erreur de récupération des shops:", err)
    });
  }

  openShopValidation() {
    this.isShopValidationOpen = true;
  }

  closeShopValidation() {
    this.isShopValidationOpen = false;
    this.refreshAll();
  }
}
