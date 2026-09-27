import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  selector: 'app-card-list',
  styleUrl: './card-list.scss',
  templateUrl: './card-list.html',
})
export class CardList {
  protected readonly loading = signal<boolean>(false);
}
