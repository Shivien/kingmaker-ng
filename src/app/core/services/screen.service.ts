import { inject, Injectable, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal 'isMobile' vaut true sur écran mobile (Handset), false sinon (PC / Tablette).
   */
  readonly isMobile: Signal<boolean> = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  /**
   * Signal complémentaire pour détecter un PC / grand écran.
   */
  readonly isDesktop: Signal<boolean> = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Web, Breakpoints.TabletLandscape])
      .pipe(map((result) => result.matches)),
    { initialValue: true }
  );
}
