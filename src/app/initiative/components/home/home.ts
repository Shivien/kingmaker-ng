import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TitleStore } from '../../../shared/store/title.store';

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly titleStore = inject(TitleStore);

  protected readonly roomNumberControl = new FormControl(
    this.getRoomNumber(),
    {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(999)],
    });

  ngOnInit(): void {
    this.titleStore.setTitle('Choix de la salle');
  }

  private getRoomNumber() {
    return Math.floor(Math.random() * 1000);
  }

}
