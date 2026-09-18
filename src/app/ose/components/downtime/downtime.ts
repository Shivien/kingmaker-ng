import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [
    MatCardModule,
  ],
  selector: 'app-downtime',
  styleUrl: './downtime.scss',
  templateUrl: './downtime.html',
})
export class Downtime {}
