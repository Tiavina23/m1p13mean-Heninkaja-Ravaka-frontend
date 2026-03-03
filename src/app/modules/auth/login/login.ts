import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {

  isLoading = false;
  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // ✅ Appel du backend
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE:', res);

        // 🔑 Vérifie que le backend renvoie bien role et accessToken
        if (!res || !res.accessToken || !res.role) {
          this.errorMessage = "Réponse invalide du serveur";
          this.isLoading = false;
          return;
        }

        // Sauvegarde user et token
        this.authService.saveUser(res);

        // Redirection selon rôle
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } 
        else if (res.role === 'shop') {
          this.router.navigate(['/shop']);
        } 
        else {
          this.router.navigate(['/carte']);
        }

        this.isLoading = false;
      },

      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Email ou mot de passe incorrect";
      }
    });
  }
}