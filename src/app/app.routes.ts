import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login';
import { Layout } from './shared/components/layout/layout';
import { Home } from './core/components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'login',
        component: Login,
      },
    ]
  }
];
