import { Routes } from '@angular/router';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';
import { AnimesService } from '../services/animes.service';
import { AnimesSearchComponent } from './animes-search/animes-search.component';
import {AnimesEditComponent} from './animes-edit/animes-edit.component';

export const ANIMES_ROUTES: Routes = [
    {
      path: '',
      component: AnimesListComponent
    },
    {
      path: ':name',
      component: AnimesDetailComponent
    },
    {
      path: 'search/:q',
      component: AnimesListComponent
    },
    {
      path: ':name/edit',
      component: AnimesEditComponent
    }
];
