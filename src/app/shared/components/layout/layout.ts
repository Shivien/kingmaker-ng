import { Component, inject, OnInit, signal } from '@angular/core';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStore } from '../../../core/store/auth.store';
import { NavigationComponent } from '../navigation/navigation';
import { ScreenService } from '../../../core/services/screen.service';
import { UserMenuComponent } from '../user-menu/user-menu';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';

@Component({
  imports: [
    BreadcrumbComponent,
    GoogleSigninButtonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NavigationComponent,
    RouterOutlet,
    UserMenuComponent,
],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private readonly socialAuthService = inject(SocialAuthService);
  protected readonly screen = inject(ScreenService);
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

  closeOnMobile(sidenav: MatSidenav): void {
    if (this.screen.isMobile()) {
      sidenav.close();
    }
  }
}
