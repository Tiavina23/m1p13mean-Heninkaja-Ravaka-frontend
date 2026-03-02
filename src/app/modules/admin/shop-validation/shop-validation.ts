import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-shop-validation',
  imports: [CommonModule],
  templateUrl: './shop-validation.html',
  styleUrl: './shop-validation.css',
})
export class ShopValidation {
    constructor(private adminService: AdminService) {}
    shops: any[] = [];
    message = '';
  ngOnInit() {
    this.loadShops();
  }

  loadShops() {
    this.adminService.getPendingShops().subscribe((data: any) => {
      this.shops = data;
    });
  }

  validate(id: string) {
    this.adminService.validateShop(id).subscribe(() => {
      this.message = "Shop validé ✅";
      this.loadShops();
    });
  }
}
