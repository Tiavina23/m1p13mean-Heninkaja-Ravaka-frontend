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
    // Création du formulaire
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }



  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {

        this.authService.saveUser(res);

        // Redirection selon rôle
        switch (res.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;

          case 'shop':
            this.router.navigate(['/shop']);
            break;

          case 'acheteur':
            this.router.navigate(['/']);
            break;

          default:
            this.router.navigate(['/']);
        }

        this.isLoading = false;
      },

      error: (err) => {
        this.errorMessage = err.error?.message || 'Email ou mot de passe incorrect';
        this.isLoading = false;
      }
    });
  }

}