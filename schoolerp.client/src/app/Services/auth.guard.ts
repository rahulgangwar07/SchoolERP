import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  if (!userRole || !userId) {
    router.navigate(['/login']);
    return false;
  } 
  const allowedRoles = route.data?.['roles'] as string[] || [];

  //const url = state.url;

  if (allowedRoles.length && !allowedRoles.map(role => role.toLowerCase()).includes(userRole.toLowerCase())) {
    router.navigate(['/unauthorized']);
    return false;
  }

  //if (url.includes('admin') && userRole !== 'admin') {
  //  router.navigate(['/unauthorized']);
  //  return false;
  //}

  //if (url.includes('faculty') && userRole !== 'faculty') {
  //  router.navigate(['/unauthorized']);
  //  return false;
  //}

  //if (url.includes('student') && userRole !== 'student') {
  //  router.navigate(['/unauthorized']);
  //  return false;
  //}

  return true;
};
