import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { RoleType } from '../../../core/types/role.type';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import User from '../../../core/models/user.model';

interface Role {
  value: RoleType;
  label: string;
}

@Component({
  imports: [
    MatAnchor,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
],
  selector: 'app-user-edit',
  styleUrl: './user-edit.scss',
  templateUrl: './user-edit.html',
})
export class UserEdit {
  public readonly id = input.required<string>();

  private readonly userService = inject(AdminService);
  private readonly snackBar = inject(MatSnackBar);

  private readonly user = signal<User | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly saving = signal<boolean>(false);
  protected readonly error = signal<boolean>(false);

  protected readonly roles: Role[] = [
    { value: 'administrator', label: 'Administrateur' },
    { value: 'anonymous', label: 'Inconnu' },
    { value: 'user', label: 'Utilisateur' },
  ];

  protected roleControl = new FormControl<RoleType>('anonymous', {
    nonNullable: true,
    validators: [Validators.required],
  });

  protected readonly userName = computed(() => this.user()?.name ?? '');
  protected readonly userEmail = computed(() => this.user()?.email ?? '');

  constructor() {
    effect(() => {
      const currentId = this.id();
      this.loadUser(currentId);
    });
  }

  private loadUser(userId: string): void {
    this.loading.set(true);
    this.error.set(false);

    this.userService.read(userId).subscribe({
      next: (value) => {
        this.user.set(value);
        this.roleControl.setValue(value.role, { emitEvent: false });
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set(true);
        this.loading.set(false);
        this.snackBar.open('Erreur lors du chargement de l\'utilisateur.', 'Fermer', { duration: 3000 });
      },
    });
  }

  protected onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (this.roleControl.invalid) {
      return;
    }

    this.saving.set(true);
    const newRole = this.roleControl.value;

    this.userService.updateRole(this.id(), newRole).subscribe({
      next: (value) => {
        this.user.set(value.user);
        this.saving.set(false);
        this.snackBar.open('Rôle mis à jour avec succès !', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 3000 });
      },
    });
  }

}
