import {SafeStyle} from "@angular/platform-browser";

export class Anime {
  id: number;
  idApi: string;
  linkApi: string;
  title: string;
  synopsis: string;
  rating: number;
  startDate: string;
  endDate: string;
  status: string;
  posterImage: string;
  coverImage: string;
  urlImg: SafeStyle;
  nbEpisode: number;
  episodeLength: number;
  ytVideoID: string;
  subtype: string;
  genres: any;
  categories: any;
  characters: any;
  recommendations: any;
}
