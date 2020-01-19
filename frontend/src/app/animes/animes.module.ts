import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';
import { AnimesEditComponent } from './animes-edit/animes-edit.component';
import { RouterModule } from '@angular/router';
import { ANIMES_ROUTES } from './animes.routes';
import { AnimesSearchComponent } from './animes-search/animes-search.component';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [AnimesListComponent, AnimesSearchComponent, AnimesEditComponent, AnimesDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ANIMES_ROUTES),
    TranslateModule.forRoot(),
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
})
export class AnimesModule { }
