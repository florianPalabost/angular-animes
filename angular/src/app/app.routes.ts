import { ANIMES_ROUTES } from './animes/animes.routes';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from './users/signin/signin.component';
import {SignupComponent} from './users/signup/signup.component';
import {AuthGuard} from './_helpers/auth.guard';

// root of the routing, in each module another .route is defined
export const APP_ROUTES = [
  {path: 'stats/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'animes', children: ANIMES_ROUTES},
  {path: 'user/login', component: SigninComponent},
  {path: 'user/register', component: SignupComponent},
  {path: '', component: HomeComponent},
];
