import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isChecked: boolean;
  lang: string;
  public isLoggedIn = false;

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService, private loginService: AuthenticationService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    this.lang = 'EN';
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
      const s = window.location.href.substring(i + 5);
      this.loginService.retrieveToken(s);
    }
  }

  // tslint:disable-next-line:typedef
  login() {
    this.loginService.login();
  }

  // tslint:disable-next-line:typedef
  account() {
    window.location.href = 'http://localhost:8085/auth/realms/heroes_battle/account/';
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.loginService.logout();
  }

}
