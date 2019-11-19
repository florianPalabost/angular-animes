import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimesListComponent } from './animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes-detail/animes-detail.component';
import { RouterModule } from '@angular/router';
import { ANIMES_ROUTES } from './animes.routes';

@NgModule({
  declarations: [AnimesListComponent],
  imports: [
    CommonModule,
    AnimesDetailComponent,
    RouterModule.forChild(ANIMES_ROUTES)
  ]
})
export class AnimesModule { }
