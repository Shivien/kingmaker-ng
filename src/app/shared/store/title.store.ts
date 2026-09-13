import { computed, inject, Injectable, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class TitleStore {
  private readonly titleService = inject(Title);
  private readonly titleSignal = signal<string | undefined>(undefined);

  public readonly title = computed(() => this.titleSignal() ?? this.titleService.getTitle());

  public setTitle(title: string) {
    this.titleService.setTitle(title);
    this.titleSignal.set(title);
  }

}
