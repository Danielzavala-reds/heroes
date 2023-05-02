import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatch, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService,
              private router: Router){}

  private checkStatus():boolean |  Observable<boolean>{
    return this.authService.checkAuthStatus()
    .pipe(
        tap( isAuthenticated => console.log('Authenticated', isAuthenticated) ),
        tap( isAuthenticated => {
          if(!isAuthenticated) this.router.navigate(['./auth/login'])
        }),
      )
  }

  // TODO: este activará la ruta si en la logica devuelve true, y sino buscará si puede entrar a la siguiente ruta con el mismo path
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      // console.log('Can Match')|
      // console.log({route, segments})
      return this.checkStatus();
    }
    
    // TODO: decide si acepta o se deniega el acceso a un ruta basándose en la logica que se le especifique al propio guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
      // console.log('Can Activate')
      // console.log({route, state})
      return this.checkStatus();
    }
}
