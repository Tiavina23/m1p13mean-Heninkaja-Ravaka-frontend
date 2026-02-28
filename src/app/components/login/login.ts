import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth} from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  defaultUsers: any = {
    admin: {
      email: 'admin@gmail.com',
      password: 'admin123'
    },
    shop: {
      email: 'shop@gmail.com',
      password: 'shop123'
    },
    acheteur: {
      email: 'acheteur@gmail.com',
      password: 'acheteur123'
    }
  };

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  // Quand on clique sur le rôle
  selectRole(role: 'admin' | 'shop' | 'acheteur') {
    this.email = this.defaultUsers[role].email;
    this.password = this.defaultUsers[role].password;
  }

  isClicked = false;

  onClick() {
  this.isClicked = true;

  setTimeout(() => {
    this.isClicked = false;
    }, 200); // effet rapide
  }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res:any) => {
        this.authService.saveAuthData(res.token, res.role);
        this.router.navigate(['/home']);
      },
      error: (err:any) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Erreur de connexion';
      }
    });
  }
}
