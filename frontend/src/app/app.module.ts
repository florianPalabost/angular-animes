import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {AnimesListComponent} from './animes/animes-list/animes-list.component';
import { AnimesDetailComponent } from './animes/animes-detail/animes-detail.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AnimesSearchComponent } from './animes/animes-search/animes-search.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AnimesEditComponent} from './animes/animes-edit/animes-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    AnimesListComponent,
    AnimesDetailComponent,
    AnimesEditComponent,
    AnimesSearchComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ScrollingModule,
    VirtualScrollerModule,
    RouterModule.forRoot(APP_ROUTES),
    InfiniteScrollModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
