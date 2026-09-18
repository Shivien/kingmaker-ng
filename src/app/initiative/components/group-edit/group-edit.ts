import { Component, computed, inject, input, OnInit } from '@angular/core';
import { InitiativeGroupModel } from '../../models/initiative-group.model';
import { InitiativeService } from '../../services/initiative.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
],
  selector: 'app-group-edit',
  styleUrl: './group-edit.scss',
  templateUrl: './group-edit.html',
})
export class GroupEdit implements OnInit {
  private readonly initiativeService = inject(InitiativeService);
  private readonly router = inject(Router);

  public readonly groupId = input<string>();
  public readonly roomNumber = input.required<number>();

  protected readonly isEditMode = computed(() => this.groupId() !== undefined);

  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly form = this.fb.group({
    label: ['', [Validators.required, Validators.maxLength(30)]],
    initiative: [0, [Validators.required, Validators.min(-5), Validators.max(40)]],
  });

  ngOnInit(): void {
    if (this.isEditMode()) {
      this.loadGroup(this.groupId()!);
    }
  }

  private loadGroup(id: string) {
    const group = this.initiativeService.getGroup(id);
    if (!group) {
      return;
    }
    this.form.patchValue({
      label: group.label,
      initiative: group.initiative,
    });
  }

  protected onDelete() {
    this.initiativeService.callGroupRemove(this.groupId()!);
    this.navigateBack();
  }

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isEditMode()) {
      this.updateGroup();
    } else {
      this.addGroup();
    }
  }

  private addGroup() {
    const { label, initiative } = this.form.getRawValue();
    this.initiativeService.callGroupAdd(label, initiative);
    this.navigateBack();
  }

  private updateGroup() {
    const { label, initiative } = this.form.getRawValue();
    const group: InitiativeGroupModel = {
      id: this.groupId()!,
      label,
      initiative,
    };
    this.initiativeService.callGroupUpdate(group);
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigateByUrl(`/initiative/room/${this.roomNumber()}`);
  }

}
