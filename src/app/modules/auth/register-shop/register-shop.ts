import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register-shop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent {
  registerForm: FormGroup;   // <-- on déclare juste la variable
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,      // <-- injection ici
    private authService: AuthService,
    private router: Router
  ) {
    // Initialisation du formulaire **après injection**
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      shopName: ['', Validators.required],
      description: ['']
    });
  }

  registerShop() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = res.message;
        this.registerForm.reset();
        // Optionnel : redirection vers login
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Inscription échouée';
      }
    });
  }
}