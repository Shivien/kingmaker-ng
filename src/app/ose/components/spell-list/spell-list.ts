import { Component, computed, effect, inject, input, signal } from '@angular/core';
import CharacterService from '../../services/character.service';
import { CharacterModel } from '../../models/character.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterLink,
  ],
  selector: 'app-spell-list',
  styleUrl: './spell-list.scss',
  templateUrl: './spell-list.html',
})
export class SpellList {
  private readonly characterService = inject(CharacterService);
  private readonly snackBar = inject(MatSnackBar);

  public readonly id = input.required<string>();

  protected readonly displayedColumns = ['level', 'name', 'prepared', 'actions'];

  protected readonly character = signal<CharacterModel | null>(null);
  protected readonly loading = signal<boolean>(false);

  protected readonly sortedSpells = computed(() => {
    const spells = this.character()?.spells ?? [];
    return [...spells].sort((a, b) => {
      if (a.level !== b.level) {
        return a.level - b.level;
      }
      return a.name.localeCompare(b.name);
    });
  });

  constructor() {
    effect(() => {
      const id = this.id();
      this.loadCharacter(id);
    });
  }

  private loadCharacter(id: string) {
    this.loading.set(true);
    this.characterService.read(id).subscribe({
      next: (value) => {
        this.character.set(value);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
        this.snackBar.open('Erreur lors du chargement du personnage.', 'Fermer', { duration: 3000 });
      },
    });
  }
}
