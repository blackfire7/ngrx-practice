import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {isLoggedIn} from "./auth.selectors";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthGuard {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) this.router.navigateByUrl('/login');
      })
    );
  }

  public static IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => inject(AuthGuard).canActivate(route, state);
}
