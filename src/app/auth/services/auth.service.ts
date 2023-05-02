import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { enviroments } from 'src/enviroments/enviroments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroments.baseURL
  private user?: User; 
  

  constructor(private http: HttpClient) { }

  get currentUser():User | undefined{
    if(!this.user) return undefined;

    // return {...this.user};

    return structuredClone (this.user); /* sC nos ayuda a realizar un clon profundo del objeto para así romper referencia */
  }

  login(email: string, password: string):Observable<User>{
    // http.post('login', {email, password})
    
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap(user => localStorage.setItem('token', 'ahsdh7189h889a8g.asdadsq.dq2q1d')),
      )
  }


  checkAuthStatus():Observable<boolean> {

    if(!localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of (false))
      )
  }

  logout(){
      this.user = undefined;
      localStorage.clear();
  }

}

 // tap(user => {
        //   this.user = user;
        //   /* grabamos el id del usuario en local storage */
        //   localStorage.setItem('token', user.id.toString());
        // })
