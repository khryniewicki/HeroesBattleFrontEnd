import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.checkCredentials()) {
      this.auth.login2();
      const path1 = route.url.pop().path;
      this.auth.setRedirectCookie(path1);
      return false;
    }
    return true;
  }


}
