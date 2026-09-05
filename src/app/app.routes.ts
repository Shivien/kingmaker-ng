import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login';
import { Layout } from './shared/components/layout/layout';
import { Home } from './home/components/home/home';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Accueil' },
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'admin',
        data: { breadcrumb: 'Administration' },
        canActivateChild: [roleGuard(['administrator'])],
        children: [
          {
            title: 'Liste des utilisateurs',
            path: 'user/list',
            data: { breadcrumb: 'Utilisateurs' },
            loadComponent: () => import('./admin/components/user-list/user-list').then(m => m.UserList),
          },
          {
            title: 'Édition d\'un utilisateur',
            path: 'user/:id/edit',
            data: { breadcrumb: 'Utilisateur' },
            loadComponent: () => import('./admin/components/user-edit/user-edit').then(m => m.UserEdit),
          },
        ],
      },
      {
        path: 'ose',
        data: { breadcrumb: 'Old School Essentials' },
        canActivateChild: [roleGuard(['administrator'])],
        children: [
          {
            title: 'Personnages OSE',
            path: 'character/list',
            data: { breadcrumb: 'Personnages' },
            loadComponent: () => import('./ose/components/character-list/character-list').then(m => m.CharacterList),
          },
          {
            title: 'Nouveau personnage OSE',
            path: 'character/new',
            data: { breadcrumb: 'Nouveau personnage' },
            loadComponent: () => import('./ose/components/character-edit/character-edit').then(m => m.CharacterEdit),
          },
          {
            title: 'Modifier personnage OSE',
            path: 'character/:id/edit',
            data: { breadcrumb: 'Modifier personnage' },
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
