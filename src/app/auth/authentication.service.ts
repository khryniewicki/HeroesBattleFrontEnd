import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

export class Msg {
  'content': string;
}

export class Authentication {
  'credentials': boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient, private router: Router) {
  }

  public clientId = 'login-app';
  public localhost = 'http://localhost:4200/';
  public authserverUrl = 'http://localhost:8085/auth/realms/heroes_battle/protocol';
  private resourceServerUrl = 'http://localhost:8445/resource-server';
  private checkRoleUrl = '/check-role';

  // tslint:disable-next-line:typedef
  private static authrization_bearer() {
    return new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
  }

  // tslint:disable-next-line:typedef
  retrieveToken(code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', '8b1b083d-f4df-4700-a825-9e2c47cc3753');
    params.append('redirect_uri', this.localhost);
    params.append('code', code);

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this._http.post(this.authserverUrl + '/openid-connect/token', params.toString(), {headers})
      .subscribe(
        data => {
          this.saveToken(data);
        },
        err => alert('Invalid Credentials' + err)
      );
  }

  // tslint:disable-next-line:typedef
  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('refresh_token', token.refresh_token, expireDate);
    window.location.href = Cookie.get('redirect');
    Cookie.delete('redirect');
  }

  getResource(resourceUrl): Observable<Msg> {
    console.log(this.resourceServerUrl + resourceUrl);
    const headers = AuthenticationService.authrization_bearer();
    return this._http.get<Msg>(this.resourceServerUrl + resourceUrl, {headers});
  }

  getResource2(resourceUrl): Observable<Blob> {
    console.log(this.resourceServerUrl + resourceUrl);
    const headers = AuthenticationService.authrization_bearer();
    return this._http.get(this.resourceServerUrl + resourceUrl, {headers, responseType: 'blob'});
  }

  // tslint:disable-next-line:typedef
  checkCredentials() {
    const credentials = Cookie.check('access_token');
    console.log('CREDENTIALS:' + credentials);
    return (credentials);
  }

  // tslint:disable-next-line:typedef
  logout() {
    const token = Cookie.get('refresh_token');
    Cookie.delete('access_token');
    Cookie.delete('refresh_token');
    window.location.href = this.authserverUrl + '/openid-connect/logout?' +
      'client_id=' + this.clientId + '&refresh_token=' + +token + '&post_logout_redirect_uri=' + this.localhost;
  }

// tslint:disable-next-line:typedef
  login2() {
    const path = this.authserverUrl + '/openid-connect/auth?response_type=code&' +
      '&client_id=' + this.clientId + '&scope=openid%20user' + '&redirect_uri=' + this.localhost;
    const time = 2000;
    this.router.navigate(['redirect']);
    setTimeout(() => window.location.href = path, time);
  }

// tslint:disable-next-line:typedef
  login() {
    Cookie.set('redirect', this.localhost);
    this.login2();
  }

  // tslint:disable-next-line:typedef
  setRedirectCookie(path1: string) {
    Cookie.set('redirect', path1);
  }

  // tslint:disable-next-line:typedef
  checkRole() {
    const headers = AuthenticationService.authrization_bearer();
    return this._http.get<Authentication>(this.resourceServerUrl + this.checkRoleUrl, {headers});
  }
}
