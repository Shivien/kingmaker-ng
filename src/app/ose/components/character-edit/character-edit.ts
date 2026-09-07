import { Component, computed, effect, inject, input, signal } from '@angular/core';
import CharacterService from '../../services/character.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CharacterModel } from '../../models/character.model';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  selector: 'app-character-edit',
  styleUrl: './character-edit.scss',
  templateUrl: './character-edit.html',
})
export class CharacterEdit {
  private readonly characterService = inject(CharacterService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  public readonly id = input<string>();
  protected readonly character = signal<CharacterModel | null>(null);

  protected readonly loading = signal<boolean>(false);
  protected readonly saving = signal<boolean>(false);

  protected readonly isEditMode = computed(() => this.id() !== undefined);

  protected readonly nameControl = new FormControl('', { nonNullable: true, validators: [Validators.required]});

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        return;
      }
      this.loadCharacter(id);
    })
  }

  private loadCharacter(id: string) {
    this.loading.set(true);
    this.characterService.read(id).subscribe({
      next: (value) => {
        this.character.set(value);
        this.nameControl.setValue(value.name);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
        this.snackBar.open('Erreur lors du chargement du personnage.', 'Fermer', { duration: 3000 });
      },
    });
  }

  protected onSubmit(): void {
    if (this.nameControl.invalid) {
      return;
    }

    this.saving.set(true);
    const name = this.nameControl.value;
    const id = this.id();

    if (this.isEditMode() && id) {
      this.saveCharacter(id, name);
    } else {
      this.createCharacter(name);
    }
  }

  private createCharacter(name: string) {
    this.characterService.create(name).subscribe({
      next: (_) => {
        this.saving.set(false);
        this.snackBar.open('Personnage créé avec succès.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/ose', 'character']);
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Une erreur est survenue lors de la création du personnage.', 'Fermer', { duration: 3000 });
      },
    });
  }

  private saveCharacter(id: string, name: string) {
    this.characterService.update(id, name).subscribe({
      next: (_) => {
        this.saving.set(false);
        this.snackBar.open('Personnage mis à jour.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/ose', 'character']);
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Une erreur est survenue lors de la mise à jour du personnage.', 'Fermer', { duration: 3000 });
      },
    });
  }

}
