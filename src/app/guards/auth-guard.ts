import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Vérifier si on est dans le navigateur
  if (isPlatformBrowser(platformId)) {

    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  }

  // Si SSR (serveur), autoriser sans localStorage
  return true;
};