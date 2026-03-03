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

    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {

        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('token', res.accessToken);
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'shop') {
          this.router.navigate(['/shop']);
        } else {
          this.router.navigate(['/home']);
        }

      },
         

      error: (err) => {
        this.isLoading = false;

        if (err.status === 403) {
          this.errorMessage = err.error.message;
        } else if (err.status === 401) {
          this.errorMessage = "Mot de passe incorrect";
        } else if (err.status === 404) {
          this.errorMessage = "Utilisateur non trouvé";
        } else {
          this.errorMessage = "Erreur serveur";
        }
      }
    });
  }

}