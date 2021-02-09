import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const credentials = this.auth.checkCredentials();

    if (!credentials) {
      this.auth.loginInKeyCloak();
      const path1 = route.url.pop().path;
      this.auth.setRedirectCookie(path1);
      return false;
    } else {
      return credentials && this.auth.checkRole().pipe(map(e => {
        if (e) {
          if (e.credentials) {
            return true;
          } else {
            alert('Invalid credentials. Only admin can enter!');
            return false;
          }
        }
      }, error => {
        console.log(error);
        // this.router.navigate(['home']);
        return false;
      }));
    }
  }
}
