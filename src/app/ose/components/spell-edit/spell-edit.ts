import { Component, computed, effect, inject, input, signal } from '@angular/core';
import CharacterService from '../../services/character.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpellModel } from '../../models/character.model';
import { MatInputModule } from "@angular/material/input";

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
],
  selector: 'app-spell-edit',
  styleUrl: './spell-edit.scss',
  templateUrl: './spell-edit.html',
})
export class SpellEdit {
  private readonly characterService = inject(CharacterService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  public readonly id = input.required<string>();

  public readonly spellId = input<string>();
  protected readonly spell = signal<SpellModel | null>(null);

  protected readonly loading = signal<boolean>(false);
  protected readonly saving = signal<boolean>(false);

  protected readonly isEditMode = computed(() => this.spellId() !== undefined);

  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly form = this.fb.group({
    name: ['', [Validators.required]],
    level: [1, [Validators.required, Validators.min(0)]],
    prepared: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    effect(() => {
      const spellId = this.spellId();
      if (!spellId) {
        return;
      }
      this.loadSpell(this.id(), spellId);
    });
  }

  private loadSpell(id: string, spellId: string) {
    this.loading.set(true);
    this.characterService.readSpell(id, spellId).subscribe({
      next: (value) => {
        this.spell.set(value);
        this.form.patchValue({
          name: value.name,
          level: value.level,
          prepared: value.prepared,
        });
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
        this.snackBar.open(
          'Erreur lors du chargement du sort.',
          'Fermer',
          { duration: 3000, panelClass: 'error' }
        );
      },
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.saving.set(true);
    const spell: SpellModel = this.form.getRawValue();
    const id = this.id();
    const spellId = this.spellId();

    if (this.isEditMode() && spellId) {
      this.saveSpell(id, { ...spell, _id: spellId });
    } else {
      this.createSpell(id, spell);
    }
  }

  private createSpell(id: string, spell: SpellModel) {
    this.characterService.createSpell(id, spell).subscribe({
      next: (_) => {
        this.saving.set(false);
        this.snackBar.open(
          'Sort créé avec succès.',
          'Fermer',
          { duration: 3000, panelClass: 'success' }
        );
        this.router.navigate(['/ose', 'character', id, 'spell']);
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open(
          'Une erreur est survenue lors de la création du sort.',
          'Fermer',
          { duration: 3000, panelClass: 'error' }
        );
      },
    });
  }

  private saveSpell(id: string, spell: SpellModel) {
    this.characterService.updateSpell(id, spell).subscribe({
      next: (_) => {
        this.saving.set(false);
        this.snackBar.open(
          'Sort mis à jour.',
          'Fermer',
          { duration: 3000, panelClass: 'success' }
        );
        this.router.navigate(['/ose', 'character', id, 'spell']);
      },
      error: (error) => {
        console.error(error);
        this.saving.set(false);
        this.snackBar.open(
          'Une erreur est survenue lors de la mise à jour du sort.',
          'Fermer',
          { duration: 3000, panelClass: 'error' }
        );
      },
    });
  }

}
