import { Component, inject, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MarkdownComponent,
    ReactiveFormsModule
],
  selector: 'app-card-edit',
  styleUrls: [
    './card-edit.scss',
    '../../../../styles/print-card.scss',
  ],
  templateUrl: './card-edit.html',
})
export class CardEdit {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly formGroup = this.fb.group({
    name: ['', [Validators.required]],
    header: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  protected readonly markdownBody = signal<string>('Un peu de texte markdown avec du **gras** et de l\'*italique*.');

}
