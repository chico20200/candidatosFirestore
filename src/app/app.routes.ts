import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'candidatos',
    loadComponent: () => import('./candidatos/candidatos.page').then( m => m.CandidatosPage)
  },
];