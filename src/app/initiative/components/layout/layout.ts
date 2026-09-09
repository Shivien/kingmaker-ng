import { Component, computed, inject, OnInit } from '@angular/core';
import { InitiativeService } from '../../services/initiative.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [
    MatIconModule,
    RouterOutlet,
  ],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private readonly initiativeService = inject(InitiativeService);
  private readonly titleService = inject(Title);

  protected readonly connected = this.initiativeService.connected.asReadonly();

  ngOnInit(): void {
    this.initiativeService.initSocket(environment.socketUrl);
  }

  protected pageTitle() {
    return this.titleService.getTitle();
  }

}
