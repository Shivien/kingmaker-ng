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

  protected readonly room = this.initiativeService.room;
  protected readonly sortBy = signal<'label' | 'initiative'>('initiative');
  protected readonly sending = signal<boolean>(false);

  protected readonly sortedGroups = computed(() => {
    const groups = this.initiativeService.room()?.groups ?? [];
    const sortBy = this.sortBy();
    return [...groups].sort((a, b) => {
      switch (sortBy) {
        case 'label':
          return a.label.localeCompare(b.label)
        case 'initiative': // Initiative descendante.
          return b.initiative - a.initiative;
      }
    });
  });

  protected onEmpty() {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    this.initiativeService.callRoomEmpty(this.room()!.id).subscribe({
      next: (value) => {
        setTimeout(() => this.sending.set(false), 300);
        if (!value.success || !value.room) {
          return;
        }
        this.initiativeService.setLocalRoom(value.room);
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => this.sending.set(false), 300);
      },
    });
  }

}
