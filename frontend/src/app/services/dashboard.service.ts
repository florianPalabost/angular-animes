import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Anime } from '../model/anime';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  BASE_URL = 'http://localhost:3001/api/v1/';

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:no-trailing-whitespace

  // updateAnime = (anime): Observable<any> => {
  //   return this.http.put<Anime>(this.BASE_URL + 'animes/' + anime.id, anime).pipe(
  //     tap(_ => console.log(`updated anime id=${anime.id}`)),
  //     catchError(this.handleError<any>('updateAnime'))
  //   );
  // }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
