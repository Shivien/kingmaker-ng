import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './auth/components/login/login';
import { UserList } from './admin/components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, UserList],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('kingmaker-ng');
}
