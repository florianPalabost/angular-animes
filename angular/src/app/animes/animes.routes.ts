import { Routes } from '@angular/router';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';
import {AnimesEditComponent} from './animes-edit/animes-edit.component';
import {CharactersComponent} from './characters/characters.component';

export const ANIMES_ROUTES: Routes = [
    {
      path: 'animes',
      component: AnimesListComponent
    },
    {
      path: ':name',
      component: AnimesDetailComponent
    },
    {
      path: ':name/characters/:characterName',
      component: CharactersComponent
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
