import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ErpPage } from './erp-page/erp-page';

export const routes: Routes = [
  { path: '', component: ErpPage,
  children: [{
    path: '',component:Dashboard
  }]}
];
