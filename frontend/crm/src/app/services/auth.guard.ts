import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // allow access
  } else {
    // redirect to login if not authenticated
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
