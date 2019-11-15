import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimesListComponent} from './animes/animes-list/animes-list.component';
import {AnimesModule} from './animes/animes.module';
import {HomeComponent} from './home/home.component';

// import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'animes',
    component: AnimesListComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
