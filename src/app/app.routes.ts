import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login';
import { Layout } from './shared/components/layout/layout';
import { Home } from './home/components/home/home';
import { roleGuard } from './core/guards/role.guard';

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
        path: 'admin',
        canActivateChild: [roleGuard(['administrator'])],
        children: [
          {
            title: 'Kingmaker / Administration / Liste des utilisateurs',
            path: 'user/list',
            loadComponent: () => import('./admin/components/user-list/user-list').then(m => m.UserList),
          },
          {
            title: 'Kingmaker / Administration / Édition d\'un utilisteur',
            path: 'user/edit/:id',
            loadComponent: () => import('./admin/components/user-edit/user-edit').then(m => m.UserEdit),
          },
        ],
      },
      {
        path: 'login',
        component: Login,
      },
    ]
  }
];
