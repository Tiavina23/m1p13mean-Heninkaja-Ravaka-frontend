import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  allShops: any[] = [];
  pendingShops: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAllShops();
    this.loadPendingShops();
  }

  loadAllShops() {
    this.adminService.getAllShops().subscribe((data: any) => {
      this.allShops = data;
    });
  }

  loadPendingShops() {
    this.adminService.getPendingShops().subscribe((data: any) => {
      this.pendingShops = data;
    });
  }
}
