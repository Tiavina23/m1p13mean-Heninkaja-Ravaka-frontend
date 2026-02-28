import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  role:any;
  shopStatus = '';

  constructor(private auth:Auth, private router:Router){}

  ngOnInit(){
    this.role = this.auth.getRole();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}