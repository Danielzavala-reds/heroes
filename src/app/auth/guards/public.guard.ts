import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService,
              private router: Router){}

  private checkAuthTrue(): Observable<boolean> | boolean {
    return this.authService.checkAuthStatus()
      .pipe(
        tap( authTrue => console.log('Authenticated', authTrue) ),
        tap( authTrue => {
          if(authTrue) this.router.navigate(['./']) //TODO: Si esta autenticado lo reedireccionamos al listado en caso de que sepa el URL del login, no pueda ir ahí
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkAuthTrue();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkAuthTrue();
  }
}
