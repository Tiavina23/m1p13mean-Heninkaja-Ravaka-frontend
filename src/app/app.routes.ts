import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit';
export const routes: Routes = [
//  {
//   path: 'admin',
//   component: AdminComponent,
//   canActivate: [AuthGuard]
// }
 { path: 'produits', component: ProduitComponent }, // Route pour
 { path: '', redirectTo: 'produits', pathMatch: 'full' }
];

