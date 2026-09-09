import { Component, computed, inject, input, OnInit } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [
    RouterOutlet,
  ],
  selector: 'app-room',
  styleUrl: './room.scss',
  templateUrl: './room.html',
})
export class Room implements OnInit {
  private readonly initiativeService = inject(InitiativeService);
  private readonly title = inject(Title);

  public readonly roomNumber = input.required<number>();
  private readonly roomId = computed(() => `room-${this.roomNumber()}`);

  private readonly roomState = computed(() => this.initiativeService.room()?.state ?? 'setting');

  ngOnInit(): void {
    this.title.setTitle(`Salle ${this.roomNumber()}`);
    this.initiativeService.joinRoom(this.roomId());
  }

}
