import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthStore } from '../../../shared/store/auth.store';
import User from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private readonly userService = inject(UserService);

  protected readonly authStore = inject(AuthStore);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly items = signal<User[]>([]);

  protected loading: boolean = true;

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
