import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../../core/services/screen.service';
import { AuthStore } from '../../../core/store/auth.store';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
  ],
  selector: 'app-user-menu',
  styleUrl: './user-menu.scss',
  templateUrl: './user-menu.html',
})
export class UserMenuComponent {
  protected readonly screen = inject(ScreenService);
  protected readonly authService = inject(AuthService);
  protected readonly authStore = inject(AuthStore);

}
