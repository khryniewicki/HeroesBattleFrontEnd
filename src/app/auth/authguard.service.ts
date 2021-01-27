import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  path = 'http://localhost:8085/auth/realms/heroes_battle/protocol/openid-connect/auth?response_type=code&client_id=';

  constructor(public auth: AuthenticationService, public router: Router) {
  }


  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.checkCredentials()) {
      this.auth.login2();
      const path1 = route.url.pop().path;
      this.auth.setCookie(path1);
      return false;
    }
    return true;
  }


}
