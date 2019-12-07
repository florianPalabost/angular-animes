import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';
import { RouterModule } from '@angular/router';
import { ANIMES_ROUTES } from './animes.routes';
import { AnimesSearchComponent } from './animes-search/animes-search.component';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [AnimesListComponent, AnimesSearchComponent],
  imports: [
    CommonModule,
    AnimesDetailComponent,
    RouterModule.forChild(ANIMES_ROUTES),
    TranslateModule.forRoot(),
    InfiniteScrollModule,
    NgxSpinnerModule
  ]
})
export class AnimesModule { }
