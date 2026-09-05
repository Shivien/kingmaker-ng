import { Component, computed, effect, inject, input, signal } from '@angular/core';
import CharacterService from '../../services/character.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CharacterModel } from '../../models/character.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  protected readonly knownSpells = computed(() => {
    const spells = this.character()?.spells?.knownSpells ?? [];
    return [...spells].sort((a, b) => {
      if (a.level !== b.level) {
        return a.level - b.level;
      }
      return a.name.localeCompare(b.name);
    });
  });

  protected readonly loading = signal<boolean>(false);
  protected readonly saving = signal<boolean>(false);

  protected readonly isEditMode = computed(() => this.id() !== undefined);

  // Contrôles de formulaire.
  protected readonly nameControl = new FormControl('', { nonNullable: true, validators: [Validators.required]});
  protected readonly newSpellNameControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  protected readonly newSpellLevelControl = new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0)] });

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
      next: (value) => {
        this.saving.set(false);
        this.snackBar.open('Personnage créé avec succès.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/ose', 'character', value._id, 'edit']);
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
      next: (value) => {
        this.character.set(value);
        this.saving.set(false);
        this.snackBar.open('Personnage mis à jour.', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Une erreur est survenue lors de la mise à jour du personnage.', 'Fermer', { duration: 3000 });
      },
    });
  }

  protected addKnownSpell(): void {
    const id = this.id();
    if (!id || this.newSpellNameControl.invalid) return;

    this.saving.set(true);
    const spell = {
      name: this.newSpellNameControl.value,
      level: Number(this.newSpellLevelControl.value),
    };

    this.characterService.addKnownSpell(id, spell).subscribe({
      next: (value) => {
        this.character.set(value);
        this.newSpellNameControl.reset();
        this.saving.set(false);
        this.snackBar.open('Sort ajouté aux sorts connus !', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Une erreur est survenue lors de l\'ajout d\'un sort.', 'Fermer', { duration: 3000 });
      },
    });
  }

  protected deleteKnownSpell(spellId: string): void {
    const id = this.id();
    if (!id) return;

    this.characterService.deleteKnownSpell(id, spellId).subscribe({
      next: (res: any) => {
        this.character.set(res.character || res);
        this.snackBar.open('Sort supprimé des sorts connus.', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open('Une erreur est survenue lors de la suppression d\'un sort.', 'Fermer', { duration: 3000 });
      },
    });
  }
}
