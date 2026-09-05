import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import CharacterService from '../../services/character.service';
import { CharacterModel } from '../../models/character.model';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterLink,
  ],
  selector: 'app-character-list',
  styleUrl: './character-list.scss',
  templateUrl: './character-list.html',
})
export class CharacterList implements OnInit {
  private readonly characterService = inject(CharacterService);

  protected readonly items = signal<CharacterModel[]>([]);
  protected readonly displayedColumns = ['name', 'actions'];
  protected readonly loading = signal<boolean>(true);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.loading.set(true),
    this.characterService.list().subscribe({
      next: (value) => {
        this.items.set(value);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Erreur lors de la récupération de la liste des personnages.');
        this.loading.set(false);
      },
    });
  }
}
