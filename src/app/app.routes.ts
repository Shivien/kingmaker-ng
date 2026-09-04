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
            path: 'user/:id/edit',
            loadComponent: () => import('./admin/components/user-edit/user-edit').then(m => m.UserEdit),
          },
        ],
      },
      {
        path: 'ose',
        canActivateChild: [roleGuard(['administrator'])],
        children: [
          {
            title: 'OSE / Personnages',
            path: 'character/list',
            loadComponent: () => import('./ose/components/character-list/character-list').then(m => m.CharacterList),
          },
          {
            title: 'OSE / Nouveau personnage',
            path: 'character/new',
            loadComponent: () => import('./ose/components/character-edit/character-edit').then(m => m.CharacterEdit),
          },
          {
            title: 'OSE / Modifier personnage',
            path: 'character/:id/edit',
            loadComponent: () => import('./ose/components/character-edit/character-edit').then(m => m.CharacterEdit),
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
