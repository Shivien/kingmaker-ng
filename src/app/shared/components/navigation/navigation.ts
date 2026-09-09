import { Component, inject, output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  imports: [
    MatExpansionModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-navigation',
  styleUrl: './navigation.scss',
  templateUrl: './navigation.html',
})
export class NavigationComponent {
  protected readonly authStore = inject(AuthStore);

  public readonly linkClicked = output();

  protected onLinkClick() {
    this.linkClicked.emit();
  }
}
