import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  // Récupération du user depuis localStorage
  const user = JSON.parse(localStorage.getItem('user')!);

  if (!user) {
    // pas connecté → redirection login
    router.navigate(['/login']);
    return false;
  }

  
  const expectedRole = route.data['role'];
  if (expectedRole && user.role !== expectedRole) {
    router.navigate(['/login']); // rôle non autorisé
    return false;
  }

  
  return true;
};