import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interfaces';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = enviroments.baseURL;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  };

  getHeroe(id: string):Observable< Heroe | undefined >{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined) ) /* El of es una forma de crear observables basado en el valor que se especifican en los parentesis */
      );
  };

  getSuggestions(term: string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${term}&_limit=5`)
  };

  postHero( hero: Heroe ):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, hero)
  };

  updateHero( hero: Heroe ):Observable<Heroe>{
    if(!hero.id) throw Error ('Hero id is required')

    return this.http.patch<Heroe>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  };

  deleteHero( id: string ):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map( res => true ),
        catchError(err => of(false))
      )
  };


  
  


}
