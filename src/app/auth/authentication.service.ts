import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {SECRET} from '../web/SECRET';

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
  // public authHost = 'http://localhost:8080';
  // public resourceHost = 'http://localhost:8445';
  // public localHost = 'http://localhost:4200';

  public authHost = 'https://heroes-battle-auth.khryniewicki.pl';
  public resourceHost = 'https://heroes-battle-res.khryniewicki.pl';
  public localHost = 'https://heroes-battle.khryniewicki.pl/';
  public authServerUrl = this.authHost + '/auth/realms/heroes_battle/protocol';
  private authAccountUrl = this.authHost + '/auth/realms/heroes_battle/account/';
  private resourceServerUrl = this.resourceHost + '/resource-server';
  private openIdUrl = '/openid-connect/token';
  private checkRoleUrl = '/api/option/check-role';
  public clientId = 'login-app';

  constructor(
    private http: HttpClient, private router: Router) {
  }

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
    params.append('client_secret', SECRET.PASSWORD);
    params.append('redirect_uri', this.localHost);
    params.append('code', code);
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this.http.post(this.authServerUrl + this.openIdUrl, params.toString(), {headers})
      .subscribe(
        data => {
          console.log(data);
          this.saveToken(data);
        },
        err => console.log('Invalid Credentials' + err)
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

  getMsg(resourceUrl): Observable<Msg> {
    console.log(this.resourceServerUrl + resourceUrl);
    const headers = AuthenticationService.authrization_bearer();
    return this.http.get<Msg>(this.resourceServerUrl + resourceUrl, {headers});
  }

  getExtendedMsg(resourceUrl): Observable<ExtendedMessage> {
    return this.http.get<ExtendedMessage>(this.resourceServerUrl + resourceUrl);
  }

  // tslint:disable-next-line:typedef
  getResource(resourceUrl) {
    console.log(this.resourceServerUrl + resourceUrl);
    const headers = AuthenticationService.authrization_bearer();
    headers.append('timeout', `${200000}`);
    return this.http.get(this.resourceServerUrl + resourceUrl,
      {headers, responseType: 'blob', reportProgress: true, observe: 'events'});
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
    window.location.href = this.authServerUrl + '/openid-connect/logout?' +
      'client_id=' + this.clientId + '&refresh_token=' + +token + '&post_logout_redirect_uri=' + this.localHost;
  }

// tslint:disable-next-line:typedef
  loginInKeyCloak() {
    const time = 2000;
    const path = this.authServerUrl + '/openid-connect/auth?response_type=code&' +
      '&client_id=' + this.clientId + '&scope=openid%20user' + '&redirect_uri=' + this.localHost;
    this.router.navigate(['redirect']);
    setTimeout(() => window.location.href = path, time);
  }

// tslint:disable-next-line:typedef
  login() {
    Cookie.set('redirect', this.localHost);
    this.loginInKeyCloak();
  }

  // tslint:disable-next-line:typedef
  setRedirectCookie(path1: string) {
    Cookie.set('redirect', path1);
  }

  // tslint:disable-next-line:typedef
  checkRole() {
    const headers = AuthenticationService.authrization_bearer();
    return this.http.get<Authentication>(this.resourceServerUrl + this.checkRoleUrl, {headers});
  }

  // tslint:disable-next-line:typedef
  account() {
    return this.authAccountUrl;
  }
}

export class ExtendedMessage {
  heroesMap: Map<string, Msg> = new Map<string, Msg>();
  timeLeft: number;
}
