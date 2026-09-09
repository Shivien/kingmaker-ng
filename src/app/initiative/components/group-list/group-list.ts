import { Component, computed, inject, input, signal } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    RouterLink,
  ],
  selector: 'app-group-list',
  styleUrl: './group-list.scss',
  templateUrl: './group-list.html',
})
export class GroupList {
  private readonly initiativeService = inject(InitiativeService);

  public readonly roomNumber = input.required<number>();

  protected readonly sortBy = signal<'label' | 'initiative'>('label');

  protected readonly sortedGroups = computed(() => {
    const groups = this.initiativeService.room()?.groups ?? [];
    const sortBy = this.sortBy();
    return [...groups].sort((a, b) => {
      switch (sortBy) {
        case 'label':
          return a.label.localeCompare(b.label)
        default: // Initiative descendante.
          return b.initiative - a.initiative;
      }
    });
  });

}
