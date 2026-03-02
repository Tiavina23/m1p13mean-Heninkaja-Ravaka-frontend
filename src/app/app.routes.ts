import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';


// Admin
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard';
import { ShopValidation } from './modules/admin/shop-validation/shop-validation';

// Shop
import { ShopDashboard } from './modules/shop/shop-dashboard/shop-dashboard';
import { ProductList } from './modules/shop/product-list/product-list';
import { ProductForm } from './modules/shop/product-form/product-form';
import { NgModule } from '@angular/core';

import { authGuard } from './guards/auth-guard';


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
            component: ProductList,
            canActivate: [authGuard],
            data: { role: 'shop' }
        },
        {
            path: 'shop/add-product',
            component: ProductForm,
            canActivate: [authGuard],
            data: { role: 'shop' }
        },

        // Accueil / acheteur
        { path: '', redirectTo: '/login', pathMatch: 'full' },

        // Wildcard
        { path: '**', redirectTo: '/login' }
        ];



  

