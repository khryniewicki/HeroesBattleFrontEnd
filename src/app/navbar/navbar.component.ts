import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {AppService} from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isChecked: boolean;
  lang: string;
  public isLoggedIn = false;

  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService, private loginService: AppService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    this.lang = 'EN';
    this.isLoggedIn = this.loginService.checkCredentials();
    const i = window.location.href.indexOf('code');
    // tslint:disable-next-line:triple-equals
    if (!this.isLoggedIn && i != -1) {
      this.loginService.retrieveToken(window.location.href.substring(i + 5));
    }
  }
  // tslint:disable-next-line:typedef
  switchLang(event: MatSlideToggleChange) {
    const checked = event.checked;
    const langs = this.translate.getLangs();
    if (checked) {
      this.translate.use(langs[1]);
      this.lang = 'PL';
    } else {
      this.translate.use(langs[0]);
      this.lang = 'EN';

    }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isLoggedIn = this.loginService.checkCredentials();
    const i = window.location.href.indexOf('code');
    // tslint:disable-next-line:triple-equals
    if (!this.isLoggedIn && i != -1) {
      this.loginService.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  // tslint:disable-next-line:typedef
  login() {
    window.location.href = 'http://localhost:8085/auth/realms/heroes_battle/protocol/openid-connect/auth?response_type=code&client_id=' +
      this.loginService.clientId + '&redirect_uri=' + this.loginService.redirectUri;
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.loginService.logout();
  }
}
