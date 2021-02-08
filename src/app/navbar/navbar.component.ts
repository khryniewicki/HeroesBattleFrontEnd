import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {AuthenticationService} from '../auth/authentication.service';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isChecked: boolean;
  lang: string;
  public isLoggedIn = false;
  public isAdmin = false;

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService,
              private authService: AuthenticationService, private router: Router) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');
    this.lang = 'PL';
    this.isChecked = true;
    if (Cookie.check('language')) {
      const language = Cookie.get('language');
      this.isChecked = language === 'PL';
      this.setLanguage(this.isChecked);
    }
  }

  // tslint:disable-next-line:typedef
  switchLang(event: MatSlideToggleChange) {
    const checked = event.checked;
    this.setLanguage(checked);
    Cookie.set('language', this.lang);
  }

  // tslint:disable-next-line:typedef
  private setLanguage(checked: boolean) {
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
  checkRole() {
    return this.authService.checkRole().subscribe(auth => {
        this.isAdmin = auth.credentials;
      },
      err => console.log(err)
    );
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isLoggedIn = this.authService.checkCredentials();
    if (this.isLoggedIn) {
      this.checkRole();
    }
    const i = window.location.href.indexOf('code');
    // tslint:disable-next-line:triple-equals
    if (!this.isLoggedIn && i != -1) {
      const s = window.location.href.substring(i + 5);
      this.authService.retrieveToken(s);
    }
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login();
  }

  // tslint:disable-next-line:typedef
  account() {
    window.location.href = this.authService.authHost + '/auth/realms/heroes_battle/account/';
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logout();
  }

  // tslint:disable-next-line:typedef
  game_panel() {
    this.router.navigate(['game-settings-panel']);
  }

  // tslint:disable-next-line:typedef
  download() {
    this.router.navigate(['download']);
  }
}
