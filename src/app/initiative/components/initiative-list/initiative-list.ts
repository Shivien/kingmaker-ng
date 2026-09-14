import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { exhaustMap, Subject } from 'rxjs';
import { RoomResponseModel } from '../../models/room-response.model';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  selector: 'app-initiative-list',
  styleUrl: './initiative-list.scss',
  templateUrl: './initiative-list.html',
})
export class InitiativeListComponent {
  private readonly initiativeService = inject(InitiativeService);

  protected readonly room = this.initiativeService.room;
  protected readonly sending = signal<boolean>(false);

  protected readonly sortedGroups = computed(() => {
    const groups = this.initiativeService.room()?.groups ?? [];
    return [...groups].sort((a, b) => b.initiative - a.initiative);
  });

  private setSendingFalse() {
    setTimeout(() => this.sending.set(false), 300);
  }

  protected onPrevious () {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    this.initiativeService.callGroupMoveToPrevious(this.room()!.id).subscribe({
      next: (value) => {
        if (!value.success || !value.room) {
          return;
        }
        this.initiativeService.setLocalRoom(value.room);
        this.setSendingFalse();
      },
      error: (error) => {
        console.error(error);
        this.setSendingFalse();
      },
    });
  }

  protected onNext() {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);

    this.initiativeService.callGroupMoveToNext(this.room()!.id).subscribe({
      next: (value) => {
        if (!value.success || !value.room) {
          return;
        }
        this.initiativeService.setLocalRoom(value.room);
        this.setSendingFalse();
      },
      error: (error) => {
        console.error(error);
        this.setSendingFalse();
      },
    });
  }

}
