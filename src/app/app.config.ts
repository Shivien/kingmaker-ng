import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    // Détection des changements optimisée (OnPush / Signals par défaut dans Angular 22)
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configuration HTTP avec injection automatique du JWT backend
    provideHttpClient(withXhr(), withInterceptors([jwtInterceptor])),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
        onError: (err) => console.error(err),
      } as SocialAuthServiceConfig,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
