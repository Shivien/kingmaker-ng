import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  imports: [
    MatIconModule,
    RouterLink,
  ],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.scss',
  templateUrl: './breadcrumb.html',
})
export class BreadcrumbComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly breadcrumbs: Signal<BreadcrumbItem[]> = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumb(this.activatedRoute.root))
    ),
    { initialValue: this.buildBreadcrumb(this.activatedRoute.root) }
  );

  private buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeUrl: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      if (routeUrl !== '') {
        url += `/${routeUrl}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        const exists = breadcrumbs.some(b => b.url === url);
        if (!exists) {
          breadcrumbs.push({ label, url });
        }
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
