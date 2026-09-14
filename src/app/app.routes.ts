import { Routes } from '@angular/router';
import { Home } from './home/components/home/home';
import { Layout } from './shared/components/layout/layout';
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
            path: 'user',
            data: { breadcrumb: 'Utilisateurs' },
            children: [
              {
                title: 'Liste des utilisateurs',
                path: '',
                loadComponent: () => import('./admin/components/user-list/user-list').then(m => m.UserList),
              },
              {
                title: 'Édition d\'un utilisateur',
                path: ':id/edit',
                data: { breadcrumb: 'Utilisateur' },
                loadComponent: () => import('./admin/components/user-edit/user-edit').then(m => m.UserEdit),
              },
            ],
          },
        ],
      },
      {
        path: 'ose',
        canActivateChild: [roleGuard(['administrator'])],
        children: [
          {
            path: 'character',
            data: { breadcrumb: 'Personnages' },
            children: [
              {
                title: 'OSE / Personnages',
                path: '',
                loadComponent: () => import('./ose/components/character-list/character-list').then(m => m.CharacterList),
              },
              {
                title: 'OSE / Nouveau personnage',
                path: 'new',
                data: { breadcrumb: 'Nouveau personnage' },
                loadComponent: () => import('./ose/components/character-edit/character-edit').then(m => m.CharacterEdit),
              },
              {
                title: 'OSE / Modifier personnage',
                path: ':id/edit',
                data: { breadcrumb: 'Modifier personnage' },
                loadComponent: () => import('./ose/components/character-edit/character-edit').then(m => m.CharacterEdit),
              },
              {
                path: ':id/spell',
                data: { breadcrumb: 'Sorts d\'un personnage' },
                children: [
                  {
                    title: 'OSE / Sorts d\'un personnage',
                    path: '',
                    loadComponent: () => import('./ose/components/spell-list/spell-list').then(m => m.SpellList),
                  },
                  {
                    title: 'OSE / Nouveau sort',
                    path: 'new',
                    data: { breadcrumb: 'Nouveau sort' },
                    loadComponent: () => import('./ose/components/spell-edit/spell-edit').then(m => m.SpellEdit),
                  },
                  {
                    title: 'OSE / Modifier sort',
                    path: ':spellId',
                    data: { breadcrumb: 'Modifier sort' },
                    loadComponent: () => import('./ose/components/spell-edit/spell-edit').then(m => m.SpellEdit),
                  },
                ],
              },
            ],
          },
          {
            path: 'downtime',
            data: { breadcrumb: 'Temps morts' },
            loadComponent: () => import('./ose/components/downtime/downtime').then(m => m.Downtime),
          },
        ],
      },
    ]
  },
  {
    path: 'initiative',
    children: [
      {
        path: '',
        loadComponent: () => import('./initiative/components/home/home').then(m => m.Home),
      },
      {
        path: 'room/:roomNumber',
        loadComponent: () => import('./initiative/components/room/room').then(m => m.Room),
        children: [
          {
            path: '',
            loadComponent: () => import('./initiative/components/group-list/group-list').then(m => m.GroupList),
          },
          {
            path: 'group/new',
            loadComponent: () => import('./initiative/components/group-edit/group-edit').then(m => m.GroupEdit),
          },
          {
            path: 'group/:groupId',
            loadComponent: () => import('./initiative/components/group-edit/group-edit').then(m => m.GroupEdit),
          },
        ],
      },
    ],
  },
];
