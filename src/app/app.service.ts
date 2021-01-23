import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public clientId = 'login-app';
  public redirectUri = 'http://localhost:4200/download';
  public return = 'http://localhost:4200/';

  constructor(
    private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  retrieveToken(code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'c2888636-0a90-4766-996c-3d0725f92734');
    params.append('redirect_uri', this.redirectUri);
    params.append('scope', 'openid');
    params.append('code', code);

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin,X-requested-With,Content-Type, Accept');
    this.httpClient.post('http://localhost:8085/auth/realms/heroes_battle/protocol/openid-connect/token', params.toString(), {headers})
      .subscribe(
        data => {
          console.log(data);
          this.saveToken(data);
        },
        err => alert('Invalid Credentials')
      );
  }


  // tslint:disable-next-line:typedef
  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('id_token', token.id_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  getResource(resourceUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + Cookie.get('access_token')
    });
    return this.httpClient.get(resourceUrl, {headers})
      .pipe((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // tslint:disable-next-line:typedef
  checkCredentials() {
    return Cookie.check('access_token');
  }

  // tslint:disable-next-line:typedef
  logout() {
    const token = Cookie.get('id_token');
    Cookie.delete('access_token');
    Cookie.delete('id_token');
    window.location.href = 'http://localhost:8085/auth/realms/heroes_battle/protocol/openid-connect/logout?id_token_hint='
      + token
      + '&post_logout_redirect_uri=' + this.return;
  }
}
