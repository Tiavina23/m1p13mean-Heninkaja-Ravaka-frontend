import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!);

    if (token) {
      // Vérifier le rôle si défini dans route
      const expectedRole = route.data['role'];
      if (expectedRole && user.role !== expectedRole) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
  return true; // SSR
};
