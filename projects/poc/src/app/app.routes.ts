import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'date',
    loadChildren: () => import("./feat/date/date.module").then(m => m.DateModule),
  }
];
