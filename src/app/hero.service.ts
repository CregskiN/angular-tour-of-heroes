import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL: string = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /**
   * GET hero-list from http server
   */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add(`HeroService: fetch heroes.`);
    return this.http.get<Hero[]>(this.heroesURL).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * GET hero-detail from http server by id
   * @param id 
   */
  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesURL}/${id}`;
    this.messageService.add(`HeroService: fetched hero, id = ${id}`);
    return this.http.get<Hero>(URL).pipe(
      tap(_ => this.log(`fetched hero, id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero, id = ${id}`))
    );
  }

  /**
   * PUT new hero-detail to http server
   * @param hero 
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero, id = ${hero.id}`)),
      catchError(this.handleError<any>(`update hero Error`))
    )
  }

  /**
   * POST new hero to http server
   * @param hero 
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`add hero, id = ${newHero.id}`)),
      catchError(this.handleError<Hero>(`add hero Error`))
    )
  }

  /**
   * DELETE hero 
   * @param hero 
   */
  deleteHero(hero: Hero): Observable<Hero> {
    const id = hero.id;
    const URL = `${this.heroesURL}/${id}`;

    return this.http.delete<Hero>(URL, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term) {
      return of([]);
    }
    const URL = `${this.heroesURL}?name=${term}`;
    return this.http.get<Hero[]>(URL).pipe(
      tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }



  /**
   * error handler
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(msg: string): void {
    this.messageService.add(`HeroService: ${msg}`)
  }
}
