import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit';
import { PromotionComponent } from './components/promotion/promotion';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Shop } from './components/shop/shop';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },

    {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard]
    },

    {
        path: 'gestionproduit',
        component: ProduitComponent,
        canActivate: [AuthGuard],
        data: { role: 'shop' }
    },

    {
        path: 'ajoutpromo',
        component: PromotionComponent,
        canActivate: [AuthGuard],
        data: { role: 'shop' }
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }

];