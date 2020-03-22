import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Anime } from '../model/anime';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

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

  retrieveAllAnimes = () => {
    return this.http.get<Anime[]>(this.BASE_URL + 'animes').toPromise();
  }

  findAnimeByName = async (name: string) => {
    // throw new Error('Method not implemented.');
    // return this.http.get<Anime>(this.BASE_URL + 'animes/' + name);
    return await this.http.get<Anime>(this.BASE_URL + 'animes/' + name).toPromise();

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

  async retrieveNbCharacs() {
    return await this.http.get(this.BASE_URL + 'characters/nbcharacters').toPromise();
  }

  async findAllGenres() {
    return await this.http.get(this.BASE_URL + 'genres').toPromise();
  }

  async findAllCategories() {
    return await this.http.get(this.BASE_URL + 'categories').toPromise();
  }

  async retrieveAnimesWithFilters(form: any) {
    return await this.http.post(this.BASE_URL + 'animes/filters', form).toPromise();
  }

  async retrieveAnimesCompletedByUser(idUser: number) {
    return await this.http.get(this.BASE_URL + 'animes/users/' + idUser).toPromise();
  }

  async updateStatusAnimeUser(formSelectedStatus: any) {
    return await this.http.post(this.BASE_URL + 'animes/watched-status', formSelectedStatus).toPromise();
  }

  async retrieveAnimeUserStatus(infoUserAnime: { animeId: number; userId: any }) {
    return await this.http.post(this.BASE_URL + 'animes/status-user', infoUserAnime).toPromise();
  }

  async findRecommendationAnime(idAnime: any) {
    return await this.http.get(this.BASE_URL + 'animes/' + idAnime + '/recommendations').toPromise();
  }

  async retrieveNbWatchAnimeByUser(idAnime: number, idUser: any) {
    return await this.http.post(this.BASE_URL + 'animes/get-rewatch', {idAnime, idUser}).toPromise();
  }

  async updateRewatchAnime(idAnime: number, idUser: any) {
    return await this.http.post(this.BASE_URL + 'animes/update-rewatch', {idAnime, idUser}).toPromise();
  }
}
