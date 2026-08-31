import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthStore } from '../../../core/store/auth.store';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly googleProviderId = environment.googleClientId;
  private readonly socialAuthService = inject(SocialAuthService);
  public readonly authService = inject(AuthService);
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

  protected signIn() {
    this.socialAuthService.signIn(this.googleProviderId);
  }
}
