import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopValidation } from '../shop-validation/shop-validation';
import { AdminService } from '../../../services/admin';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule , ShopValidation],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent  {

  isShopValidationOpen = false;
  shops: any[] = [];       // liste des shops validés
  pendingShopsCount = 0;   // nombre de shops en attente

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadShops();
    this.loadPendingShopsCount();
  }

  openShopValidation() {
    this.isShopValidationOpen = true;
  }

  closeShopValidation() {
    this.isShopValidationOpen = false;
    // recharge les shops et pending après fermeture
    this.loadShops();
    this.loadPendingShopsCount();
  }

  loadShops() {
    this.adminService.getAllShops().subscribe(
      (data: any) => this.shops = data,
      err => console.error(err)
    );
  }

  loadPendingShopsCount() {
    this.adminService.getPendingShops().subscribe(
      (data: any) => this.pendingShopsCount = data.length,
      err => console.error(err)
    );
  }
}

