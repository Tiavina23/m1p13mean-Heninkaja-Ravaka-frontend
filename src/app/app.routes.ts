import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';


// Admin
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard';
import { ShopValidation } from './modules/admin/shop-validation/shop-validation';

// Shop
import { ShopDashboard } from './modules/shop/shop-dashboard/shop-dashboard';
import { authGuard } from './guards/auth-guard';
import { PromotionComponent } from './modules/shop/promotion/promotion';
import { ProduitComponent } from './modules/shop/produit/produit';
import { CarteComponent } from './modules/acheteur/carte/carte';

export const routes: Routes = [
        // Auth routes
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        // Admin routes
        {
            path: 'admin',
            component: AdminDashboardComponent,
            canActivate: [authGuard],
            data: { role: 'admin' }
        },
        {
            path: 'admin/validate-shops',
            component: ShopValidation,
            canActivate: [authGuard],
            data: { role: 'admin' }
        },

        // Shop routes
        {
            path: 'shop',
            component: ShopDashboard,
            canActivate: [authGuard],
            data: { role: 'shop' }
        },
        {
            path: 'shop/products',
            component: ProduitComponent,
            canActivate: [authGuard],
            data: { role: 'shop' }
        },
        {
            path: 'shop/add-promotion',
            component: PromotionComponent,
            canActivate: [authGuard],
            data: { role: 'shop' }
        },
        {
            path: 'carte',
            component: CarteComponent
            
        },

        // Accueil / acheteur
        { path: '', redirectTo: '/login', pathMatch: 'full' },

        // Wildcard
        { path: '**', redirectTo: '/login' }
        ];



  

