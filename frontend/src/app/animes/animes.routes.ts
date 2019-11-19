import { Routes } from '@angular/router';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';

export const ANIMES_ROUTES: Routes = [
    {
      path: '',
      component: AnimesListComponent
    },
    {
      path: ':name',
      component: AnimesDetailComponent
    },
];
