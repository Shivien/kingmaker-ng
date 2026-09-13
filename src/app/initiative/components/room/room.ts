import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { RouterOutlet } from '@angular/router';
import { TitleStore } from '../../../shared/store/title.store';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateType } from '../../models/room.model';
import { InitiativeListComponent } from '../initiative-list/initiative-list';

@Component({
  imports: [
    InitiativeListComponent,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
],
  selector: 'app-room',
  styleUrl: './room.scss',
  templateUrl: './room.html',
})
export class Room implements OnInit {
  private readonly initiativeService = inject(InitiativeService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly titleStore = inject(TitleStore);

  protected readonly acting = signal<boolean>(false);
  protected readonly connected = this.initiativeService.connected.asReadonly();
  protected readonly pageTitle = this.titleStore.title;

  public readonly roomNumber = input.required<number>();
  private readonly roomId = computed(() => `room-${this.roomNumber()}`);

  protected readonly roomState = computed(() => this.initiativeService.room()?.state ?? 'setting');

  ngOnInit(): void {
    this.titleStore.setTitle(`Salle ${this.roomNumber()}`);
    this.initiativeService.initSocket(environment.socketUrl);
    this.roomJoin(this.roomId());
  }

  private roomJoin(roomId: string) {
    this.initiativeService.roomLoading.set(true);
    this.initiativeService.callRoomJoin(roomId).subscribe({
      next: (value) => {
        if (!value.success || !value.room) {
          this.snackbar.open(
            `Échec de l\'entrée dans la salle ${this.roomNumber()}.`,
            'Fermer',
            { duration: 3000, panelClass: 'error' }
          );
          return;
        }
        this.initiativeService.setLocalRoom(value.room);
        this.initiativeService.roomLoading.set(false);
        this.snackbar.open(
          `Entrée dans la salle ${this.roomNumber()} réussie.`,
          'Fermer',
          { duration: 3000, panelClass: 'success' }
        );
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open(
          `Erreur lors de l\'entrée dans la salle ${this.roomNumber()}.`,
          'Fermer',
          { duration: 3000, panelClass: 'error' }
        );
      },
    });
  }

  protected onToggleState(newState: StateType) {
    console.log(`onToggleState(newState: ${newState})`);
    this.acting.set(true);
    this.initiativeService.callRoomSetState(this.roomId(), newState).subscribe({
      next: (value) => {
        if (!value.success || !value.room) {
          this.snackbar.open(
            `Échec du changement d\'état.`,
            'Fermer',
            { duration: 3000, panelClass: 'error' }
          );
          return;
        }
        this.initiativeService.setLocalRoom(value.room);
        this.acting.set(false);
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open(
          `Erreur lors du changement d\'état.`,
          'Fermer',
          { duration: 3000, panelClass: 'error' }
        );
      },
    });
  }

}
