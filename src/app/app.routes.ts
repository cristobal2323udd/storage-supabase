import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/galeria/galeria.page').then((m) => m.GaleriaPage),
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/nuevo/nuevo.page').then((m) => m.NuevoPage),
  },
];
