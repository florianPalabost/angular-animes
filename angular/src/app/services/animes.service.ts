import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Anime } from '../model/anime';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../model/user';

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
  BASE_URL = 'http://localhost:3002/api/v1/';

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

  retrieveAnimes = (batch: number, lastKey: string): Observable<any>  => {
    return this.http.get<Anime[]>(this.BASE_URL + 'animes/pages/' + batch);
  }

  updateAnime = (anime): Observable<any> => {
    return this.http.put<Anime>(this.BASE_URL + 'animes/' + anime.id, anime).pipe(
      tap(_ => console.log(`updated anime id=${anime.id}`)),
      catchError(this.handleError<any>('updateAnime'))
    );
  }

  removeAnime = (id): Observable<any> => {
    // todo test this method
    return this.http.delete(this.BASE_URL, id);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  retrieveNbCharacs(): Observable<any> {
    return this.http.get(this.BASE_URL + 'characters/nbcharacters');
  }

  findAllGenres(): Observable<any> {
    return this.http.get(this.BASE_URL + 'genres');
  }

  findAllCategories(): Observable<any> {
    return this.http.get(this.BASE_URL + 'categories');
  }

  retrieveAnimesWithFilters(form: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'animes/filters', form);
  }


  retrieveAnimesCompletedByUser(idUser: number): Observable<any> {
    // const params = new HttpParams()
    //   .set('userId', String(idUser));
    return this.http.get(this.BASE_URL + 'animes/users/' + idUser);
  }

  updateStatusAnimeUser(formSelectedStatus: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'animes/watched-status', formSelectedStatus);
  }

  retrieveAnimeUserStatus(infoUserAnime: { animeId: number; userId: any }): Observable<any> {
    return this.http.post(this.BASE_URL + 'animes/status-user', infoUserAnime);
  }
}
