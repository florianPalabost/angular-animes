import { ANIMES_ROUTES } from './animes/animes.routes';

export const APP_ROUTES = [
  {path: 'animes', children: ANIMES_ROUTES}
];
