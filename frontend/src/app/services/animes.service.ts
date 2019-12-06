import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anime } from '../model/anime';
import { Observable } from 'rxjs';

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class AnimesService {
  BASE_URL = 'http://localhost:3001/api/v1/';

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:no-trailing-whitespace
  
  retrieveAllAnimes = (): Observable<any> => {
    return this.http.get<Anime[]>(this.BASE_URL + 'animes');
  }

  findAnimeByName = (name: string): Observable<any> => {
    // throw new Error('Method not implemented.');
    return this.http.get<Anime>(this.BASE_URL + 'animes/' + name);
  }

  findAnimesLike = (name: string): Observable<any> => {
    console.log('call findANimeLike :  ' + name);
    return this.http.get<Anime[]>(this.BASE_URL + 'animes/like/' + name);
  }

  findAnimesLikeAll = (name: string): Observable<any> => {
    console.log('call findANimeLikeAll :  ' + name);
    return this.http.get<Anime[]>(this.BASE_URL + 'animes/likeall/' + name);
  }
}
