import { Component, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-navigation',
  styleUrl: './navigation.scss',
  templateUrl: './navigation.html',
})
export class NavigationComponent {
  public readonly linkClicked = output();

  protected onLinkClick() {
    this.linkClicked.emit();
  }
}
