import { Component, inject, OnInit, signal } from '@angular/core';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  imports: [
    GoogleSigninButtonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
  ],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private readonly socialAuthService = inject(SocialAuthService);
  protected readonly authService = inject(AuthService);
  protected readonly authStore = inject(AuthStore);

  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next: (socialUser) => {
        if (!socialUser?.idToken) {
          return;
        }

        this.authService.loginWithGoogle(socialUser.idToken).subscribe({
          next: () => this.errorMessage.set(null),
          error: (err) => {
            console.error('Erreur Backend API:', err);
            this.errorMessage.set('Erreur de connexion avec le serveur Express.');
          },
        });
      },
    });
  }
}
