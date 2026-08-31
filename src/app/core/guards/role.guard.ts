import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RoleType } from "../types/role.type";
import { AuthStore } from "../store/auth.store";

export const roleGuard = (allowedRoles: RoleType[]): CanActivateFn => {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    const userRole = authStore.userRole();
    if (authStore.isAuthenticated() && userRole && allowedRoles.includes(userRole)) {
      return true;
    }
    return router.parseUrl('/');
  };
};
