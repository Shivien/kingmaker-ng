import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import User from "../../core/models/user.model";
import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthState {
  user: User |null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const LOCALSTORAGEKEY_TOKEN = '/kingmaker/auth/token';
const LOCALSTORAGEKEY_USER = '/kingmaker/auth/user';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(LOCALSTORAGEKEY_USER) || 'null'),
  token: localStorage.getItem(LOCALSTORAGEKEY_TOKEN),
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token()),
    isAdmin: computed(() => store.user()?.role === 'administrator'),
    userEmail: computed(() => store.user()?.email),
    userName: computed(() => store.user()?.name ?? 'Invité'),
    userPicture: computed(() => store.user()?.picture),
    userRole: computed(() => store.user()?.role ?? 'anonymous'),
  })),
  withMethods((store, router = inject(Router)) => ({
    // Action de connexion réussie.
    loginSuccess(user: User, token: string): void {
      localStorage.setItem(LOCALSTORAGEKEY_TOKEN, token);
      localStorage.setItem(LOCALSTORAGEKEY_USER, JSON.stringify(user));
      // Permet de mettre à jour l'état de manière immuable.
      patchState(store, {
        user,
        token,
        isLoading: false,
        error: null,
      });
    },
    // Action de déconnexion.
    logout(): void {
      localStorage.removeItem(LOCALSTORAGEKEY_TOKEN);
      localStorage.removeItem(LOCALSTORAGEKEY_USER);
      patchState(store, {
        user: null,
        token: null,
        error: null,
      });
      router.navigate(['/']);
    },
    // Gestion des erreurs.
    setError(errorMessage: string): void {
      patchState(store, { error: errorMessage, isLoading: false });
    },
    setLoading(isLoading: boolean): void {
      patchState(store, { isLoading });
    },
  }))
);
