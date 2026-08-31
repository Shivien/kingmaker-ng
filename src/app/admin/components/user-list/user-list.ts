import { Component, effect, inject, signal } from '@angular/core';
import { AuthStore } from '../../../core/store/auth.store';
import { UserService } from '../../services/user.service';
import User from '../../../core/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  imports: [MatButtonModule, MatIcon, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private readonly userService = inject(UserService);

  protected readonly authStore = inject(AuthStore);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly items = signal<User[]>([]);

  protected loading: boolean = true;
  protected displayedColumns = ['avatar', 'name', 'email', 'role', 'actions'];

  constructor() {
    effect(() => {
      if (!this.authStore.isAuthenticated()) {
        return;
      }

      this.loadItems();
    });
  }

  private loadItems() {
    this.loading = true;
    this.userService.list().subscribe({
      next: (value) => {
        this.items.set(value.items);
        this.errorMessage.set(null);
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Erreur lors de la récupération de la liste des utilisateurs.');
        this.loading = false;
      },
    });
  }
}
