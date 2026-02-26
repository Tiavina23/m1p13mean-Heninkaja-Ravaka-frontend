import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-shop-validation',
  imports: [],
  templateUrl: './shop-validation.html',
  styleUrl: './shop-validation.css',
})
export class ShopValidation {
    constructor(private adminService: AdminService) {}
    shops: any[] = [];
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
      this.loadShops();
    });
  }
}
