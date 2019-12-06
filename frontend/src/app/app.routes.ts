import { ANIMES_ROUTES } from './animes/animes.routes';
import { HomeComponent } from './home/home.component';

// root of the routing, in each module another .route is defined 
export const APP_ROUTES = [
  {path: '', component: HomeComponent},
  {path: 'animes', children: ANIMES_ROUTES}
];
